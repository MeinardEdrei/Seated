import axios from "axios";
import Constants from "expo-constants";
import { Storage } from "../utils/storage";

const API_URL = Constants.expoConfig?.extra?.API_URL + "/api";

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
  status: "Pending" | "Approved" | "Rejected"; // Match your backend enum
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


export const createEvent = async (eventData: EventPayload): Promise<EventResponse> => {
  const token = await Storage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found. User might not be authenticated.");
  }
  try {
    const { data } = await axios.post<EventResponse>(
      `${API_URL}/Event/create-event`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("Event created successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = 
    error.response?.data?.message || "Unknown error";
    throw new Error(backendMessage);
  }
};

// For Event Patch

export const updateEvent = async (
  eventData: Partial<EventPayload> & { eventId: number },
): Promise<EventResponse> => {
  const token = await Storage.getItem("accessToken");
  const { eventId, ...updateData } = eventData;
  if (!token) {
    throw new Error("No access token found. User might not be authenticated.");
  }
  try {
    const { data } = await axios.patch<EventResponse>(
      `${API_URL}/Event/update-event/${eventId}`,
      updateData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log("Event updated successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Unknown error";
    throw new Error(backendMessage);
  }
};


export const deleteEvent = async (eventId: number): Promise<{ message: string }> => { 
  const token = await Storage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found. User might not be authenticated.");
  }
  try {
    const { data } = await axios.delete<{ message: string }>(
      `${API_URL}/Event/delete-event/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("Event deleted successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Unknown error";
    throw new Error(backendMessage);
  }
};


export const getEventDetails = async (eventId: number): Promise<EventResponse> => {
  const token = await Storage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found. User might not be authenticated.");
  }
  try {
    const { data } = await axios.get<EventResponse>(
      `${API_URL}/Event/get-event/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("Fetched event details successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Unknown error";
    throw new Error(backendMessage);
  }
};

export const listEvents = async (): Promise<EventListResponse> => {
  const token = await Storage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found. User might not be authenticated.");
  }
  try {
    const { data } = await axios.get<EventListResponse>(
      `${API_URL}/Event/get-all-events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("Fetched event list successfully:", data);
    return data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Unknown error";
    throw new Error(backendMessage);
  }
};
