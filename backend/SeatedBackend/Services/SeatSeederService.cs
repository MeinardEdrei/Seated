using Microsoft.EntityFrameworkCore;
using SeatedBackend.Data;
using SeatedBackend.Models;

namespace SeatedBackend.Services
{
    public class SeatSeederService
    {
        private readonly ApplicationDbContext _context;

        public SeatSeederService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedSeatsForVenue(int venueId, string venueName = "UMak Performing Arts Theater")
        {
            // Check if venue exists, create if not
            var venue = await _context.Venues.FindAsync(venueId);
            if (venue == null)
            {
                venue = new Venue
                {
                    VenueId = venueId,
                    VenueName = venueName,
                    Capacity = 0
                };
                _context.Venues.Add(venue);
            }

            // Check if seats already exist
            if (await _context.Seats.AnyAsync(s => s.VenueId == venueId))
            {
                Console.WriteLine($"Seats already exist for venue {venueId}. Skipping seed.");
                return;
            }

            Console.WriteLine($"Seeding seats for {venueName}...");

            var allSeats = new List<Seat>();

            // First Floor
            allSeats.AddRange(SeedFirstFloor(venueId));
            // Second Floor
            allSeats.AddRange(SeedSecondFloor(venueId));

            await _context.Seats.AddRangeAsync(allSeats);

            // Update venue capacity
            venue.Capacity = allSeats.Count;

            await _context.SaveChangesAsync();

            Console.WriteLine($"Successfully seeded {allSeats.Count} seats for {venueName}");
        }

        #region First Floor Seeding

        private List<Seat> SeedFirstFloor(int venueId)
        {
            var seats = new List<Seat>();

            seats.AddRange(SeedLBL(venueId));
            seats.AddRange(SeedOL(venueId));
            seats.AddRange(SeedOC(venueId));
            seats.AddRange(SeedOR(venueId));
            seats.AddRange(SeedLBR(venueId));

            return seats;
        }

        private List<Seat> SeedLBL(int venueId)
        {
            var section = "Lower Balcony Left (LBL)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (54, 46) },  // View1: 54-51, View2: 50-46 - Combined: 54-46
                { "B", (56, 47) },  // View1: 56-52, View2: 51-47 - Combined: 56-47
                { "C", (60, 49) },  // View1: 60-55, View2: 54-49 - Combined: 60-49
                { "D", (64, 51) },  // View1: 64-58, View2: 57-51 - Combined: 64-51
                { "E", (68, 53) },  // View1: 68-61, View2: 60-53 - Combined: 68-53
                { "F", (70, 54) },  // View1: 70-63, View2: 62-54 - Combined: 70-54
                { "G", (68, 53) },  // View1: 68-61, View2: 60-53 - Combined: 68-53
                { "H", (68, 53) },
                { "J", (68, 53) },
                { "K", (68, 53) },
                { "L", (68, 53) },
                { "M", (68, 53) },
                { "N", (68, 53) },
                { "P", (32, 17) }   // View1: 32-25, View2: 24-17 - Combined: 32-17
            };

            return GenerateSeatsWithLetters(ranges, section, "First", venueId);
        }

        private List<Seat> SeedOL(int venueId)
        {
            var section = "Orchestra Left (OL)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (45, 34) },  // View1: 45-40, View2: 39-34 - Combined: 45-34
                { "B", (46, 35) },
                { "C", (48, 37) },
                { "D", (50, 39) },
                { "E", (52, 41) },
                { "F", (53, 42) },
                { "G", (52, 41) },
                { "H", (52, 41) },
                { "J", (52, 41) },
                { "K", (52, 41) },
                { "L", (52, 41) },
                { "M", (52, 41) },
                { "N", (52, 41) }
            };

            return GenerateSeatsWithLetters(ranges, section, "First", venueId);
        }

        private List<Seat> SeedOC(int venueId)
        {
            var section = "Orchestra Center (OC)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (33, 22) },  // View1: 33-28, View2: 27-22 - Combined: 33-22
                { "B", (34, 23) },
                { "C", (36, 25) },
                { "D", (38, 27) },
                { "E", (40, 29) },
                { "F", (41, 30) },
                { "G", (40, 29) },
                { "H", (40, 29) },
                { "J", (40, 29) },
                { "K", (40, 29) },
                { "L", (40, 29) },
                { "M", (40, 29) },
                { "N", (40, 29) }
            };

            return GenerateSeatsWithLetters(ranges, section, "First", venueId);
        }

        private List<Seat> SeedOR(int venueId)
        {
            var section = "Orchestra Right (OR)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (21, 10) },  // View1: 21-16, View2: 15-10 - Combined: 21-10
                { "B", (22, 11) },
                { "C", (24, 13) },
                { "D", (26, 15) },
                { "E", (28, 17) },
                { "F", (29, 18) },
                { "G", (28, 17) },
                { "H", (28, 17) },
                { "J", (28, 17) },
                { "K", (28, 17) },
                { "L", (28, 17) },
                { "M", (28, 17) },
                { "N", (28, 17) }
            };

            return GenerateSeatsWithLetters(ranges, section, "First", venueId);
        }

        private List<Seat> SeedLBR(int venueId)
        {
            var section = "Lower Balcony Right (LBR)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "A", (9, 1) },    // View1: 9-6, View2: 5-1 - Combined: 9-1
                { "B", (10, 1) },
                { "C", (12, 1) },
                { "D", (14, 1) },
                { "E", (16, 1) },
                { "F", (17, 1) },
                { "G", (16, 1) },
                { "H", (16, 1) },
                { "J", (16, 1) },
                { "K", (16, 1) },
                { "L", (16, 1) },
                { "M", (16, 1) },
                { "N", (16, 1) },
                { "P", (16, 1) }
            };

            return GenerateSeatsWithLetters(ranges, section, "First", venueId);
        }

        #endregion

        #region Second Floor Seeding

        private List<Seat> SeedSecondFloor(int venueId)
        {
            var seats = new List<Seat>();

            seats.AddRange(SeedUBSL(venueId));
            seats.AddRange(SeedUBL(venueId));
            seats.AddRange(SeedLL(venueId));
            seats.AddRange(SeedLR(venueId));
            seats.AddRange(SeedUBR(venueId));
            seats.AddRange(SeedUBSR(venueId));

            return seats;
        }

        private List<Seat> SeedUBSL(int venueId)
        {
            var section = "Upper Balcony Super Left (UBSL)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (64, 58) },
                { "BB", (66, 60) }
            };

            return GenerateSeatsWithLetters(ranges, section, "Second", venueId);
        }

        private List<Seat> SeedUBL(int venueId)
        {
            var section = "Upper Balcony Left (UBL)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (57, 45) }, // View1: 57-52, View2: 51-45 - Combined: 57-45
                { "BB", (59, 46) }, // View1: 59-53, View2: 52-46 - Combined: 59-46
                { "CC", (56, 42) }, // View1: 56-50, View2: 49-42 - Combined: 56-42
                { "DD", (48, 34) }, // View1: 48-42, View2: 41-34 - Combined: 48-34
                { "EE", (32, 17) }, // View1: 32-25, View2: 24-17 - Combined: 32-17
                { "FF", (37, 20) }  // View1: 37-29, View2: 28-20 - Combined: 37-20
            };

            return GenerateSeatsWithLetters(ranges, section, "Second", venueId);
        }

        private List<Seat> SeedLL(int venueId)
        {
            var section = "Lodge Left (LL)";

            var ranges = new List<(int max, int min, int rowNum)>
            {
                (44, 33, 1), // View1: 44-39, View2: 38-33 - Combined: 44-33
                (45, 34, 2), // View1: 45-40, View2: 39-34 - Combined: 45-34
                (41, 29, 3), // View1: 41-36, View2: 35-29 - Combined: 41-29
                (33, 25, 4)  // View1: 33-30, View2: 29-25 - Combined: 33-25
            };

            return GenerateSeatsWithoutLetters(ranges, section, "Second", venueId);
        }

        private List<Seat> SeedLR(int venueId)
        {
            var section = "Lodge Right (LR)";

            var ranges = new List<(int max, int min, int rowNum)>
            {
                (32, 21, 1), // View1: 32-27, View2: 26-21 - Combined: 32-21
                (33, 22, 2), // View1: 33-28, View2: 27-22 - Combined: 33-22
                (28, 16, 3), // View1: 28-23, View2: 22-16 - Combined: 28-16
                (24, 16, 4)  // View1: 24-21, View2: 20-16 - Combined: 24-16
            };

            return GenerateSeatsWithoutLetters(ranges, section, "Second", venueId);
        }

        private List<Seat> SeedUBR(int venueId)
        {
            var section = "Upper Balcony Right (UBR)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (20, 8) },  // View1: 20-15, View2: 14-8 - Combined: 20-8
                { "BB", (21, 8) },  // View1: 21-15, View2: 14-8 - Combined: 21-8
                { "CC", (15, 1) },  // View1: 15-9, View2: 8-1 - Combined: 15-1
                { "DD", (15, 1) },
                { "EE", (16, 1) },  // View1: 16-9, View2: 8-1 - Combined: 16-1
                { "FF", (19, 2) }   // View1: 19-11, View2: 10-2 - Combined: 19-2
            };

            return GenerateSeatsWithLetters(ranges, section, "Second", venueId);
        }

        private List<Seat> SeedUBSR(int venueId)
        {
            var section = "Upper Balcony Super Right (UBSR)";

            var ranges = new Dictionary<string, (int max, int min)>
            {
                { "AA", (7, 1) },
                { "BB", (7, 1) }
            };

            return GenerateSeatsWithLetters(ranges, section, "Second", venueId);
        }

        #endregion

        #region Helper Methods

        // Generates seats from row ranges (for sections with row letters)
        private List<Seat> GenerateSeatsWithLetters(
            Dictionary<string, (int max, int min)> ranges,
            string section,
            string floorType,
            int venueId)
        {
            var seats = new List<Seat>();

            foreach (var row in ranges)
            {
                for (int col = row.Value.max; col >= row.Value.min; col--)
                {
                    var seatCode = $"{row.Key}{col}";

                    seats.Add(new Seat
                    {
                        VenueId = venueId,
                        Section = section,
                        FloorType = floorType,
                        SeatCode = seatCode,
                        DisplaySeatCode = TransformDisplayCode(seatCode),
                        SeatRow = row.Key,
                        SeatColumn = col,
                        Status = SeatStatus.Available,
                        IsSpecial = false,
                    });
                }
            }

            return seats;
        }

        private List<Seat> GenerateSeatsWithoutLetters(
            List<(int max, int min, int rowNum)> ranges,
            string section,
            string floorType,
            int venueId)
        {
            var seats = new List<Seat>();

            foreach (var range in ranges)
            {
                for (int col = range.max; col >= range.min; col--)
                {
                    seats.Add(new Seat
                    {
                        VenueId = venueId,
                        Section = section,
                        FloorType = floorType,
                        SeatCode = $"{col}",
                        DisplaySeatCode = $"{col}",
                        SeatRow = range.rowNum.ToString(),
                        SeatColumn = col,
                        Status = SeatStatus.Available,
                        IsSpecial = false
                    });
                }
            }

            return seats;
        }

        private string TransformDisplayCode(string seatCode)
        {
            return seatCode == "FF18" || seatCode == "FF19"
                ? seatCode.Replace("FF", "EE")
                : seatCode;
        }

        #endregion
    }
}
