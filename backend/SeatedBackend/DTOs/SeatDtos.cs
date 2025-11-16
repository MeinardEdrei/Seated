namespace SeatedBackend.DTOs
{
    public class SeatDto
    {
        public int SeatId { get; set; }
        public string SeatCode { get; set; } = string.Empty;
        public string DisplaySeatCode { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string? SeatRow { get; set; }
        public int? SeatColumn { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsSpecial { get; set; }
    }

    public class ViewData
    {
        public int ViewNumber { get; set; }
        public int StartColumn { get; set; }
        public int EndColumn { get; set; }
        public int TotalColumns { get; set; }
        public List<SeatDto> Seats { get; set; } = new List<SeatDto>();
    }

    public class ColumnRange
    {
        public int Min { get; set; }
        public int Max { get; set; }
    }

    public class RowRange
    {
        public string Start { get; set; } = string.Empty;
        public string End { get; set; } = string.Empty;
    }

    public class SectionData
    {
        public string Section { get; set; } = string.Empty;
        public string FloorType { get; set; } = string.Empty;
        public int TotalSeats { get; set; }
        public ColumnRange ColumnRange { get; set; } = new ColumnRange();
        public RowRange RowRange { get; set; } = new RowRange();
        public List<ViewData> Views { get; set; } = new List<ViewData>();
    }

    public class ResponseMetadata
    {
        public int? MaxColumnsUsed { get; set; }
        public int TotalSections { get; set; }
        public int TotalSeats { get; set; }
    }

    public class FloorSeatsResponse
    {
        public string FloorType { get; set; } = string.Empty;
        public List<SectionData> Sections { get; set; } = new List<SectionData>();
        public ResponseMetadata Metadata { get; set; } = new ResponseMetadata();
    }
}
