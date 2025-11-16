using System;
using System.Linq;
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
        public ActionResult<FloorSeatsResponse> GetSeatsByFloor(
        string floorType,
        [FromQuery] bool? mobile = null)
        {
            var isMobile = mobile ?? false;

            // Generate seats
            var sections = GenerateSeats(floorType, isMobile);

            return Ok(new FloorSeatsResponse
            {
                FloorType = floorType,
                Sections = sections,
                Metadata = new ResponseMetadata
                {
                    MaxColumnsUsed = isMobile ? 9 : null,
                    TotalSections = sections.Count,
                    TotalSeats = sections.Sum(s => s.TotalSeats)
                }
            });
        }

        // What i did with GenerateSeats is each view already have predefined ranges
        // so it matches the UPAT format and our design
        private List<SectionData> GenerateSeats(string floorType, bool isMobile)
        {
            var sections = new List<SectionData>();
            int seatIdCounter = 1;

            if (floorType.ToLower() == "first")
            {
                sections.Add(GenerateLBL(isMobile, ref seatIdCounter));
                sections.Add(GenerateOL(isMobile, ref seatIdCounter));
                sections.Add(GenerateOC(isMobile, ref seatIdCounter));
                sections.Add(GenerateOR(isMobile, ref seatIdCounter));
                sections.Add(GenerateLBR(isMobile, ref seatIdCounter));
            }
            else // Second floor
            {
                sections.Add(GenerateUBSL(isMobile, ref seatIdCounter));
                sections.Add(GenerateUBL(isMobile, ref seatIdCounter));
                sections.Add(GenerateLL(isMobile, ref seatIdCounter));
                sections.Add(GenerateLR(isMobile, ref seatIdCounter));
                sections.Add(GenerateUBR(isMobile, ref seatIdCounter));
                sections.Add(GenerateUBSR(isMobile, ref seatIdCounter));
            }

            return sections;
        }

        #region First Floor Sections

        private SectionData GenerateLBL(bool isMobile, ref int seatIdCounter)
        {
            var section = "Lower Balcony Left (LBL)";
            var allSeats = new List<SeatDto>();

            // View 1 ranges
            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (54, 51) }, { "B", (56, 52) }, { "C", (60, 55) },
                { "D", (64, 58) }, { "E", (68, 61) }, { "F", (70, 63) },
                { "G", (68, 61) }, { "H", (68, 61) }, { "J", (68, 61) },
                { "K", (68, 61) }, { "L", (68, 61) }, { "M", (68, 61) },
                { "N", (68, 61) }, { "P", (32, 25) }
            };

            // View 2 ranges
            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (50, 46) }, { "B", (51, 47) }, { "C", (54, 49) },
                { "D", (57, 51) }, { "E", (60, 53) }, { "F", (62, 54) },
                { "G", (60, 53) }, { "H", (60, 53) }, { "J", (60, 53) },
                { "K", (60, 53) }, { "L", (60, 53) }, { "M", (60, 53) },
                { "N", (60, 53) }, { "P", (24, 17) }
            };

            if (isMobile)
            {
                // Return 2 separate views
                var view1Seats = GenerateSeatsFromRanges(view1Ranges, section, ref seatIdCounter);
                var view2Seats = GenerateSeatsFromRanges(view2Ranges, section, ref seatIdCounter);

                allSeats.AddRange(view1Seats);
                allSeats.AddRange(view2Seats);

                return CreateSectionData(
                    section,
                    "First",
                    allSeats,
                    new List<ViewData>
                    {
                        CreateViewData(1, 70, 46, view1Seats),
                        CreateViewData(2, 62, 46, view2Seats)
                    }
                );
            }
            else
            {
                // Desktop: Combine both views
                var allRanges = view1Ranges.Concat(view2Ranges)
                    .GroupBy(kvp => kvp.Key)
                    .ToDictionary(
                        g => g.Key,
                        g => (
                            g.Max(x => x.Value.max), // Highest number
                            g.Min(x => x.Value.min)  // Lowest number
                        )
                    );

                allSeats = GenerateSeatsFromRanges(allRanges, section, ref seatIdCounter);

                return CreateSectionData(
                    section,
                    "First",
                    allSeats,
                    new List<ViewData> { CreateViewData(1, 70, 46, allSeats) }
                );
            }
        }

        private SectionData GenerateOL(bool isMobile, ref int seatIdCounter)
        {
            var section = "Orchestra Left (OL)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (45, 40) }, { "B", (46, 41) }, { "C", (48, 43) },
                { "D", (50, 45) }, { "E", (52, 47) }, { "F", (53, 48) },
                { "G", (52, 47) }, { "H", (52, 47) }, { "J", (52, 47) },
                { "K", (52, 47) }, { "L", (52, 47) }, { "M", (52, 47) },
                { "N", (52, 47) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (39, 34) }, { "B", (40, 35) }, { "C", (42, 37) },
                { "D", (44, 39) }, { "E", (46, 41) }, { "F", (47, 42) },
                { "G", (46, 41) }, { "H", (46, 41) }, { "J", (46, 41) },
                { "K", (46, 41) }, { "L", (46, 41) }, { "M", (46, 41) },
                { "N", (46, 41) }
            };

            return CreateSectionFromViews(section, "First", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        private SectionData GenerateOC(bool isMobile, ref int seatIdCounter)
        {
            var section = "Orchestra Center (OC)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (33, 28) }, { "B", (34, 29) }, { "C", (36, 31) },
                { "D", (38, 33) }, { "E", (40, 35) }, { "F", (41, 36) },
                { "G", (40, 35) }, { "H", (40, 35) }, { "J", (40, 35) },
                { "K", (40, 35) }, { "L", (40, 35) }, { "M", (40, 35) },
                { "N", (40, 35) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (27, 22) }, { "B", (28, 23) }, { "C", (30, 25) },
                { "D", (32, 27) }, { "E", (34, 29) }, { "F", (35, 30) },
                { "G", (34, 29) }, { "H", (34, 29) }, { "J", (34, 29) },
                { "K", (34, 29) }, { "L", (34, 29) }, { "M", (34, 29) },
                { "N", (34, 29) }
            };

            return CreateSectionFromViews(section, "First", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        private SectionData GenerateOR(bool isMobile, ref int seatIdCounter)
        {
            var section = "Orchestra Right (OR)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (21, 16) }, { "B", (22, 17) }, { "C", (24, 19) },
                { "D", (26, 21) }, { "E", (28, 23) }, { "F", (29, 24) },
                { "G", (28, 23) }, { "H", (28, 23) }, { "J", (28, 23) },
                { "K", (28, 23) }, { "L", (28, 23) }, { "M", (28, 23) },
                { "N", (28, 23) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (15, 10) }, { "B", (16, 11) }, { "C", (18, 13) },
                { "D", (20, 15) }, { "E", (22, 17) }, { "F", (23, 18) },
                { "G", (22, 17) }, { "H", (22, 17) }, { "J", (22, 17) },
                { "K", (22, 17) }, { "L", (22, 17) }, { "M", (22, 17) },
                { "N", (22, 17) }
            };

            return CreateSectionFromViews(section, "First", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        private SectionData GenerateLBR(bool isMobile, ref int seatIdCounter)
        {
            var section = "Lower Balcony Right (LBR)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (9, 6) }, { "B", (10, 6) }, { "C", (12, 7) },
                { "D", (14, 8) }, { "E", (16, 9) }, { "F", (17, 10) },
                { "G", (16, 10) }, { "H", (16, 10) }, { "J", (16, 10) },
                { "K", (16, 10) }, { "L", (16, 10) }, { "M", (16, 10) },
                { "N", (16, 10) }, { "P", (16, 10) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (5, 1) }, { "B", (5, 1) }, { "C", (6, 1) },
                { "D", (7, 1) }, { "E", (8, 1) }, { "F", (9, 1) },
                { "G", (9, 1) }, { "H", (9, 1) }, { "J", (9, 1) },
                { "K", (9, 1) }, { "L", (9, 1) }, { "M", (9, 1) },
                { "N", (9, 1) }, { "P", (9, 1) }
            };

            return CreateSectionFromViews(section, "First", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        #endregion

        #region Second Floor Sections

        private SectionData GenerateUBSL(bool isMobile, ref int seatIdCounter)
        {
            var section = "Upper Balcony Super Left (UBSL)";

            // UBSL has only 1 view (fits in mobile)
            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (64, 58) },
                { "BB", (66, 60) }
            };

            var seats = GenerateSeatsFromRanges(ranges, section, ref seatIdCounter);

            return CreateSectionData(
                section,
                "Second",
                seats,
                new List<ViewData> { CreateViewData(1, 66, 58, seats) }
            );
        }

        private SectionData GenerateUBL(bool isMobile, ref int seatIdCounter)
        {
            var section = "Upper Balcony Left (UBL)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (57, 52) }, { "BB", (59, 53) }, { "CC", (56, 50) },
                { "DD", (48, 42) }, { "EE", (32, 25) }, { "FF", (37, 29) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (51, 45) }, { "BB", (52, 46) }, { "CC", (49, 42) },
                { "DD", (41, 34) }, { "EE", (24, 17) }, { "FF", (28, 20) }
            };

            return CreateSectionFromViews(section, "Second", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        private SectionData GenerateLL(bool isMobile, ref int seatIdCounter)
        {
            var section = "Lodge Left (LL)";

            // LL has NO ROW LETTERS - just numbers
            // Only 4 rows (pseudo AA-DD, no EE/FF here!)
            // View 1: 4 rows
            var view1Ranges = new List<(int max, int min)>
            {
                (44, 39), // Row 1 (pseudo-AA)
                (45, 40), // Row 2 (pseudo-BB)
                (41, 36), // Row 3 (pseudo-CC)
                (33, 30)  // Row 4 (pseudo-DD)
            };

            // View 2: 4 rows (same structure)
            var view2Ranges = new List<(int max, int min)>
            {
                (38, 33), // Row 1 (pseudo-AA)
                (39, 34), // Row 2 (pseudo-BB)
                (35, 29), // Row 3 (pseudo-CC)
                (29, 25)  // Row 4 (pseudo-DD)
            };

            if (isMobile)
            {
                var view1Seats = GenerateSeatsWithoutRowLetters(view1Ranges, section, ref seatIdCounter, 1);
                var view2Seats = GenerateSeatsWithoutRowLetters(view2Ranges, section, ref seatIdCounter, 2);

                var allSeats = view1Seats.Concat(view2Seats).ToList();

                return CreateSectionData(
                    section,
                    "Second",
                    allSeats,
                    new List<ViewData>
                    {
                        CreateViewData(1, 45, 25, view1Seats),
                        CreateViewData(2, 39, 25, view2Seats)
                    }
                );
            }
            else
            {
                var allRanges = view1Ranges.Concat(view2Ranges).ToList();
                var allSeats = GenerateSeatsWithoutRowLetters(allRanges, section, ref seatIdCounter, 1);

                return CreateSectionData(
                    section,
                    "Second",
                    allSeats,
                    new List<ViewData> { CreateViewData(1, 45, 25, allSeats) }
                );
            }
        }

        private SectionData GenerateLR(bool isMobile, ref int seatIdCounter)
        {
            var section = "Lodge Right (LR)";

            // LR has NO ROW LETTERS - just numbers
            var view1Ranges = new List<(int max, int min)>
            {
                (32, 27), (33, 28), (28, 23), (24, 21)
            };

            var view2Ranges = new List<(int max, int min)>
            {
                (26, 21), (27, 22), (22, 16), (20, 16)
            };

            if (isMobile)
            {
                var view1Seats = GenerateSeatsWithoutRowLetters(view1Ranges, section, ref seatIdCounter, 1);
                var view2Seats = GenerateSeatsWithoutRowLetters(view2Ranges, section, ref seatIdCounter, 2);

                var allSeats = view1Seats.Concat(view2Seats).ToList();

                return CreateSectionData(
                    section,
                    "Second",
                    allSeats,
                    new List<ViewData>
                    {
                        CreateViewData(1, 33, 16, view1Seats),
                        CreateViewData(2, 27, 16, view2Seats)
                    }
                );
            }
            else
            {
                var allRanges = view1Ranges.Concat(view2Ranges).ToList();
                var allSeats = GenerateSeatsWithoutRowLetters(allRanges, section, ref seatIdCounter, 1);

                return CreateSectionData(
                    section,
                    "Second",
                    allSeats,
                    new List<ViewData> { CreateViewData(1, 33, 16, allSeats) }
                );
            }
        }

        private SectionData GenerateUBR(bool isMobile, ref int seatIdCounter)
        {
            var section = "Upper Balcony Right (UBR)";

            var view1Ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (20, 15) }, { "BB", (21, 15) }, { "CC", (15, 9) },
                { "DD", (15, 9) }, { "EE", (16, 9) }, { "FF", (19, 11) }
            };

            var view2Ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (14, 8) }, { "BB", (14, 8) }, { "CC", (8, 1) },
                { "DD", (8, 1) }, { "EE", (8, 1) }, { "FF", (10, 2) }
            };

            return CreateSectionFromViews(section, "Second", view1Ranges, view2Ranges, isMobile, ref seatIdCounter);
        }

        private SectionData GenerateUBSR(bool isMobile, ref int seatIdCounter)
        {
            var section = "Upper Balcony Super Right (UBSR)";

            // UBSR has only 1 view (fits in mobile)
            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (7, 1) },
                { "BB", (7, 1) }
            };

            var seats = GenerateSeatsFromRanges(ranges, section, ref seatIdCounter);

            return CreateSectionData(
                section,
                "Second",
                seats,
                new List<ViewData> { CreateViewData(1, 7, 1, seats) }
            );
        }

        #endregion

        #region Helper Methods

        // Generates seats from row ranges
        private List<SeatDto> GenerateSeatsFromRanges(
            Dictionary<string, (int max, int min)> ranges,
            string section,
            ref int seatIdCounter)
        {
            var seats = new List<SeatDto>();

            foreach (var row in ranges)
            {
                for (int col = row.Value.max; col >= row.Value.min; col--)
                {
                    seats.Add(new SeatDto
                    {
                        SeatId = seatIdCounter++,
                        Section = section,
                        SeatCode = $"{row.Key}{col}",
                        DisplaySeatCode = TransformDisplayCode($"{row.Key}{col}"),
                        SeatRow = row.Key,
                        SeatColumn = col,
                        Status = col % 7 == 0 ? "Reserved" : col % 13 == 0 ? "Disabled" : "Available",
                        IsSpecial = col % 10 == 0 ? true : false
                    });
                }
            }

            return seats;
        }

        // Generates seats WITHOUT row letters (for LL and LR sections)
        private List<SeatDto> GenerateSeatsWithoutRowLetters(
            List<(int max, int min)> ranges,
            string section,
            ref int seatIdCounter,
            int startingRowNum)
        {
            var seats = new List<SeatDto>();
            int rowNum = startingRowNum;

            foreach (var range in ranges)
            {
                for (int col = range.max; col >= range.min; col--)
                {
                    seats.Add(new SeatDto
                    {
                        SeatId = seatIdCounter++,
                        Section = section,
                        SeatCode = $"{col}", // Just the number
                        DisplaySeatCode = $"{col}",
                        SeatRow = rowNum.ToString(), // Use row number for grouping
                        SeatColumn = col,
                        Status = col % 7 == 0 ? "Reserved" : "Available",
                        IsSpecial = false
                    });
                }
                rowNum++;
            }

            return seats;
        }

        // Create section from 2 views
        private SectionData CreateSectionFromViews(
            string section,
            string floorType,
            Dictionary<string, (int max, int min)> view1Ranges,
            Dictionary<string, (int max, int min)> view2Ranges,
            bool isMobile,
            ref int seatIdCounter)
        {
            if (isMobile)
            {
                var view1Seats = GenerateSeatsFromRanges(view1Ranges, section, ref seatIdCounter);
                var view2Seats = GenerateSeatsFromRanges(view2Ranges, section, ref seatIdCounter);
                var allSeats = view1Seats.Concat(view2Seats).ToList();

                return CreateSectionData(
                    section,
                    floorType,
                    allSeats,
                    new List<ViewData>
                    {
                        CreateViewData(1, view1Ranges.Max(x => x.Value.max), view1Ranges.Min(x => x.Value.min), view1Seats),
                        CreateViewData(2, view2Ranges.Max(x => x.Value.max), view2Ranges.Min(x => x.Value.min), view2Seats)
                    }
                );
            }
            else
            {
                // Desktop: Combine both views
                var allRanges = view1Ranges.Concat(view2Ranges)
                    .GroupBy(rowLetter => rowLetter.Key)
                    .ToDictionary(
                        g => g.Key,
                        g => (
                            g.Max(x => x.Value.max),
                            g.Min(x => x.Value.min)
                        )
                    );

                var allSeats = GenerateSeatsFromRanges(allRanges, section, ref seatIdCounter);

                return CreateSectionData(
                    section,
                    floorType,
                    allSeats,
                    new List<ViewData> { CreateViewData(1, allRanges.Max(x => x.Value.Item1), allRanges.Min(x => x.Value.Item2), allSeats) }
                );
            }
        }

        private string TransformDisplayCode(string seatCode)
        {
            return seatCode == "FF18" || seatCode == "FF19"
                ? seatCode.Replace("FF", "EE")
                : seatCode;
        }

        private SectionData CreateSectionData(
            string section,
            string floorType,
            List<SeatDto> allSeats,
            List<ViewData> views)
        {
            return new SectionData
            {
                Section = section,
                FloorType = floorType,
                TotalSeats = allSeats.Count,
                ColumnRange = new ColumnRange
                {
                    Min = allSeats.Min(s => s.SeatColumn ?? 0),
                    Max = allSeats.Max(s => s.SeatColumn ?? 0)
                },
                RowRange = new RowRange
                {
                    Start = allSeats.First().SeatRow ?? "",
                    End = allSeats.Last().SeatRow ?? ""
                },
                Views = views
            };
        }

        private ViewData CreateViewData(
            int viewNumber,
            int startColumn,
            int endColumn,
            List<SeatDto> seats)
        {
            return new ViewData
            {
                ViewNumber = viewNumber,
                StartColumn = startColumn,
                EndColumn = endColumn,
                TotalColumns = Math.Abs(startColumn - endColumn) + 1,
                Seats = seats
            };
        }

        #endregion
    }
}
