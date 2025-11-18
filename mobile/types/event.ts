export type EventPayload = {
  venueId: number;
  eventName: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
};

export type Event = EventPayload & {
  eventId: number;
  organizerId: number;
  status: "Pending" | "Approved" | "Rejected";
  qrCode?: string | null;
  createdAt: string;
  updatedAt: string;
  approvalDate?: string | null;
};

export type EventResponse = {
  message: string;
  data: Event;
};

export type EventListResponse = {
  data: Event[];
};
