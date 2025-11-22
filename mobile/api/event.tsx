import axiosInstance from "../services/axiosInstance";

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


export const createEvent = async (formdata: FormData): Promise<EventResponse> => {
  try {
    const { data } = await axiosInstance.post<EventResponse>(
      "/Event/create-event",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data) => {
          return data;
        },
      }
    );
    console.log("Event created successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to create event";
    throw new Error(backendMessage);
  }
};

export const updateEvent = async (
  eventData: Partial<EventPayload> & { eventId: number },
): Promise<EventResponse> => {
  const { eventId, ...updateData } = eventData;
  
  try {
    const { data } = await axiosInstance.patch<EventResponse>(
      `/Event/update-event/${eventId}`,
      updateData,
    );
    console.log("Event updated successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to update event";
    throw new Error(backendMessage);
  }
};

export const deleteEvent = async (eventId: number): Promise<{ message: string }> => { 
  try {
    const { data } = await axiosInstance.delete<{ message: string }>(
      `/Event/delete-event/${eventId}`,
    );
    console.log("Event deleted successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to delete event";
    throw new Error(backendMessage);
  }
};


export const getEventDetails = async (eventId: number): Promise<EventResponse> => {
  try {
    const { data } = await axiosInstance.get<EventResponse>(
      `/Event/get-event/${eventId}`,
    );
    console.log("Fetched event details successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to fetch event details";
    throw new Error(backendMessage);
  }
};

export const listEvents = async (): Promise<EventListResponse> => {
  try {
    const { data } = await axiosInstance.get<EventListResponse>(
      "/Event/get-all-events",
    );
    console.log("Fetched event list successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to fetch events";
    throw new Error(backendMessage);
  }
};

export const listEventsByOrganizer = async (): Promise<EventListResponse> => {
  try {
    const { data } = await axiosInstance.get<EventListResponse>(
      "/Event/get-events-by-organizer",
    );
    return data;
  } catch (error: any) {
    const backendMessage = 
      error.response?.data?.message || "Failed to fetch organizer's events";
    throw new Error(backendMessage);
  }
};
