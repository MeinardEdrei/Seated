export interface SeatDto {
  seatId: number;
  seatCode: string;
  displaySeatCode: string;
  section: string;
  seatRow: string | null;
  seatColumn: number | null;
  status: string;
  isSpecial: boolean;
}

export interface ViewData {
  viewNumber: number;
  startColumn: number;
  endColumn: number;
  totalColumns: number;
  seats: SeatDto[];
}

export interface SectionData {
  section: string;
  floorType: string;
  totalSeats: number;
  columnRange: { min: number; max: number };
  rowRange: { start: string; end: string };
  views: ViewData[];
}

export interface FloorSeatsResponse {
  floorType: string;
  sections: SectionData[];
  metadata: {
    maxColumnsUsed: number | null;
    totalSections: number;
    totalSeats: number;
  };
}

export interface SeatGridProps {
  seats: SeatDto[];
  onSeatPress: (seatId: number, seatCode: string, status: string) => void;
  selectedSeats: number;
  isDesktop: boolean;
}
