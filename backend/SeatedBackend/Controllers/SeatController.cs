using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;

namespace SeatedBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeatController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("by-floor/{floorType}")]
        public async Task<ActionResult<FloorSeatsResponse>> GetSeatsByFloor(
        string floorType,
        [FromQuery] int venueId = 1,
        [FromQuery] bool? mobile = null)
        {
            var isMobile = mobile ?? false;

            var seats = await _context.Seats
                .Where(s => s.VenueId == venueId && s.FloorType.ToLower() == floorType.ToLower())
                .OrderBy(s => s.Section)
                .ThenBy(s => s.SeatRow)
                .ThenByDescending(s => s.SeatColumn)
                .ToListAsync();

            if (!seats.Any())
            {
                return NotFound($"No seats found for {floorType} floor");
            }

            // Group seats into sections with views
            var sections = GroupSeatsIntoSections(seats, floorType, isMobile);

            return Ok(new FloorSeatsResponse
            {
                FloorType = floorType,
                Sections = sections,
                Metadata = new ResponseMetadata
                {
                    MaxColumnsUsed = isMobile ? 9 : null,
                    TotalSections = sections.Count,
                    TotalSeats = seats.Count,
                }
            });
        }

        #region Private Helper Methods

        private List<SectionData> GroupSeatsIntoSections(List<Seat> seats, string floorType, bool isMobile)
        {
            var sections = new List<SectionData>();

            // Define section order for proper display
            var sectionOrder = floorType.ToLower() == "first"
                ? new[] { "Lower Balcony Left (LBL)", "Orchestra Left (OL)", "Orchestra Center (OC)", "Orchestra Right (OR)", "Lower Balcony Right (LBR)" }
                : new[] { "Upper Balcony Super Left (UBSL)", "Upper Balcony Left (UBL)", "Lodge Left (LL)", "Lodge Right (LR)", "Upper Balcony Right (UBR)", "Upper Balcony Super Right (UBSR)" };

            foreach (var sectionName in sectionOrder)
            {
                var sectionSeats = seats.Where(s => s.Section == sectionName).ToList();
                if (!sectionSeats.Any()) continue;

                var views = CreateViews(sectionSeats, sectionName, isMobile);

                sections.Add(new SectionData
                {
                    Section = sectionName,
                    FloorType = floorType,
                    TotalSeats = sectionSeats.Count,
                    ColumnRange = new ColumnRange
                    {
                        Min = sectionSeats.Min(s => s.SeatColumn ?? 0),
                        Max = sectionSeats.Max(s => s.SeatColumn ?? 0)
                    },
                    RowRange = new RowRange
                    {
                        Start = sectionSeats.First().SeatRow ?? "",
                        End = sectionSeats.Last().SeatRow ?? ""
                    },
                    Views = views
                });
            }

            return sections;
        }

        // Creates views from seats (1 view for desktop, 2 for mobile)
        private List<ViewData> CreateViews(List<Seat> seats, string sectionName, bool isMobile)
        {
            // Sections that only have 1 view even on mobile
            var singleViewSections = new[] { "Upper Balcony Super Left (UBSL)", "Upper Balcony Super Right (UBSR)" };

            if (!isMobile || singleViewSections.Contains(sectionName))
            {
                // Desktop or single-view sections: return all seats in one view
                return new List<ViewData>
                {
                    new ViewData
                    {
                        ViewNumber = 1,
                        StartColumn = seats.Max(s => s.SeatColumn ?? 0),
                        EndColumn = seats.Min(s => s.SeatColumn ?? 0),
                        TotalColumns = seats.Select(s => s.SeatColumn).Distinct().Count(),
                        Seats = seats.Select(MapToDto).ToList()
                    }
                };
            }

            // Mobile: Split into 2 views based on predefined ranges
            return CreateMobileViews(seats, sectionName);
        }

        // Creates 2 views for mobile
        private List<ViewData> CreateMobileViews(List<Seat> seats, string sectionName)
        {
            var viewDefinitions = GetViewDefinitions(sectionName);

            if (viewDefinitions == null)
            {
                // Fallback for sections without views
                return new List<ViewData>
                {
                    new ViewData
                    {
                        ViewNumber = 1,
                        StartColumn = seats.Max(s => s.SeatColumn ?? 0),
                        EndColumn = seats.Min(s => s.SeatColumn ?? 0),
                        TotalColumns = seats.Select(s => s.SeatColumn).Distinct().Count(),
                        Seats = seats.Select(MapToDto).ToList()
                    }
                };
            }

            // Separate seats into views based on row-specific ranges
            var view1Seats = new List<Seat>();
            var view2Seats = new List<Seat>();

            foreach (var seat in seats)
            {
                var seatRow = seat.SeatRow;
                var seatCol = seat.SeatColumn ?? 0;

                // Check if seat belongs to view 1
                if (viewDefinitions.View1.TryGetValue(seatRow ?? "", out var view1Range))
                {
                    // Range is (max, min), so check if seatCol is between min and max
                    if (seatCol >= view1Range.min && seatCol <= view1Range.max)
                    {
                        view1Seats.Add(seat);
                        continue;
                    }
                }

                // Check if this belongs to view 2
                if (viewDefinitions.View2.TryGetValue(seatRow ?? "", out var view2Range))
                {
                    if (seatCol >= view2Range.min && seatCol <= view2Range.max)
                    {
                        view2Seats.Add(seat);
                    }
                }
            }

            return new List<ViewData>
            {
                new ViewData
                {
                    ViewNumber = 1,
                    StartColumn = view1Seats.Any() ? view1Seats.Max(s => s.SeatColumn ?? 0) : 0,
                    EndColumn = view1Seats.Any() ? view1Seats.Min(s => s.SeatColumn ?? 0) : 0,
                    TotalColumns = view1Seats.Select(s => s.SeatColumn).Distinct().Count(),
                    Seats = view1Seats.Select(MapToDto).ToList()
                },
                new ViewData
                {
                    ViewNumber = 2,
                    StartColumn = view2Seats.Any() ? view2Seats.Max(s => s.SeatColumn ?? 0) : 0,
                    EndColumn = view2Seats.Any() ? view2Seats.Min(s => s.SeatColumn ?? 0) : 0,
                    TotalColumns = view2Seats.Select(s => s.SeatColumn).Distinct().Count(),
                    Seats = view2Seats.Select(MapToDto).ToList()
                }
            };
        }

        // Helper class to hold view definitions
        private class ViewDefinition
        {
            public Dictionary<string, (int max, int min)> View1 { get; set; } = new();
            public Dictionary<string, (int max, int min)> View2 { get; set; } = new();
        }

        private ViewDefinition? GetViewDefinitions(string sectionName)
        {
            return sectionName switch
            {
                "Lower Balcony Left (LBL)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (54, 51) }, { "B", (56, 52) }, { "C", (60, 55) },
                        { "D", (64, 58) }, { "E", (68, 61) }, { "F", (70, 63) },
                        { "G", (68, 61) }, { "H", (68, 61) }, { "J", (68, 61) },
                        { "K", (68, 61) }, { "L", (68, 61) }, { "M", (68, 61) },
                        { "N", (68, 61) }, { "P", (32, 25) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (50, 46) }, { "B", (51, 47) }, { "C", (54, 49) },
                        { "D", (57, 51) }, { "E", (60, 53) }, { "F", (62, 54) },
                        { "G", (60, 53) }, { "H", (60, 53) }, { "J", (60, 53) },
                        { "K", (60, 53) }, { "L", (60, 53) }, { "M", (60, 53) },
                        { "N", (60, 53) }, { "P", (24, 17) }
                    }
                },

                "Orchestra Left (OL)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (45, 40) }, { "B", (46, 41) }, { "C", (48, 43) },
                        { "D", (50, 45) }, { "E", (52, 47) }, { "F", (53, 48) },
                        { "G", (52, 47) }, { "H", (52, 47) }, { "J", (52, 47) },
                        { "K", (52, 47) }, { "L", (52, 47) }, { "M", (52, 47) },
                        { "N", (52, 47) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (39, 34) }, { "B", (40, 35) }, { "C", (42, 37) },
                        { "D", (44, 39) }, { "E", (46, 41) }, { "F", (47, 42) },
                        { "G", (46, 41) }, { "H", (46, 41) }, { "J", (46, 41) },
                        { "K", (46, 41) }, { "L", (46, 41) }, { "M", (46, 41) },
                        { "N", (46, 41) }
                    }
                },

                "Orchestra Center (OC)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (33, 28) }, { "B", (34, 29) }, { "C", (36, 31) },
                        { "D", (38, 33) }, { "E", (40, 35) }, { "F", (41, 36) },
                        { "G", (40, 35) }, { "H", (40, 35) }, { "J", (40, 35) },
                        { "K", (40, 35) }, { "L", (40, 35) }, { "M", (40, 35) },
                        { "N", (40, 35) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (27, 22) }, { "B", (28, 23) }, { "C", (30, 25) },
                        { "D", (32, 27) }, { "E", (34, 29) }, { "F", (35, 30) },
                        { "G", (34, 29) }, { "H", (34, 29) }, { "J", (34, 29) },
                        { "K", (34, 29) }, { "L", (34, 29) }, { "M", (34, 29) },
                        { "N", (34, 29) }
                    }
                },

                "Orchestra Right (OR)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (21, 16) }, { "B", (22, 17) }, { "C", (24, 19) },
                        { "D", (26, 21) }, { "E", (28, 23) }, { "F", (29, 24) },
                        { "G", (28, 23) }, { "H", (28, 23) }, { "J", (28, 23) },
                        { "K", (28, 23) }, { "L", (28, 23) }, { "M", (28, 23) },
                        { "N", (28, 23) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (15, 10) }, { "B", (16, 11) }, { "C", (18, 13) },
                        { "D", (20, 15) }, { "E", (22, 17) }, { "F", (23, 18) },
                        { "G", (22, 17) }, { "H", (22, 17) }, { "J", (22, 17) },
                        { "K", (22, 17) }, { "L", (22, 17) }, { "M", (22, 17) },
                        { "N", (22, 17) }
                    }
                },

                "Lower Balcony Right (LBR)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (9, 6) }, { "B", (10, 6) }, { "C", (12, 7) },
                        { "D", (14, 8) }, { "E", (16, 9) }, { "F", (17, 10) },
                        { "G", (16, 10) }, { "H", (16, 10) }, { "J", (16, 10) },
                        { "K", (16, 10) }, { "L", (16, 10) }, { "M", (16, 10) },
                        { "N", (16, 10) }, { "P", (16, 10) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "A", (5, 1) }, { "B", (5, 1) }, { "C", (6, 1) },
                        { "D", (7, 1) }, { "E", (8, 1) }, { "F", (9, 1) },
                        { "G", (9, 1) }, { "H", (9, 1) }, { "J", (9, 1) },
                        { "K", (9, 1) }, { "L", (9, 1) }, { "M", (9, 1) },
                        { "N", (9, 1) }, { "P", (9, 1) }
                    }
                },

                "Upper Balcony Left (UBL)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "AA", (57, 52) }, { "BB", (59, 53) }, { "CC", (56, 50) },
                        { "DD", (48, 42) }, { "EE", (32, 25) }, { "FF", (37, 29) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "AA", (51, 45) }, { "BB", (52, 46) }, { "CC", (49, 42) },
                        { "DD", (41, 34) }, { "EE", (24, 17) }, { "FF", (28, 20) }
                    }
                },

                "Lodge Left (LL)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "1", (44, 39) }, { "2", (45, 40) },
                        { "3", (41, 36) }, { "4", (33, 30) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "1", (38, 33) }, { "2", (39, 34) },
                        { "3", (35, 29) }, { "4", (29, 25) }
                    }
                },

                "Lodge Right (LR)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "1", (32, 27) }, { "2", (33, 28) },
                        { "3", (28, 23) }, { "4", (24, 21) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "1", (26, 21) }, { "2", (27, 22) },
                        { "3", (22, 16) }, { "4", (20, 16) }
                    }
                },

                "Upper Balcony Right (UBR)" => new ViewDefinition
                {
                    View1 = new Dictionary<string, (int max, int min)>
                    {
                        { "AA", (20, 15) }, { "BB", (21, 15) }, { "CC", (15, 9) },
                        { "DD", (15, 9) }, { "EE", (16, 9) }, { "FF", (19, 11) }
                    },
                    View2 = new Dictionary<string, (int max, int min)>
                    {
                        { "AA", (14, 8) }, { "BB", (14, 8) }, { "CC", (8, 1) },
                        { "DD", (8, 1) }, { "EE", (8, 1) }, { "FF", (10, 2) }
                    }
                },

                _ => null
            };
        }

        // Maps Seat entity to SeatDto for API response
        private SeatDto MapToDto(Seat seat)
        {
            return new SeatDto
            {
                SeatId = seat.SeatId,
                SeatCode = seat.SeatCode,
                DisplaySeatCode = seat.DisplaySeatCode,
                Section = seat.Section,
                SeatRow = seat.SeatRow,
                SeatColumn = seat.SeatColumn,
                Status = seat.Status.ToString(),
                IsSpecial = seat.IsSpecial
            };
        }

        #endregion
    }
}
