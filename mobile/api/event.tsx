import axios from 'axios';
import Constants from 'expo-constants';


const API_URL = Constants.expoConfig?.extra?.API_URL + "/api";

type Event = {
  organizerId: string;
  venueId: string;
  eventName: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
};

type EventResponse = {
  message: string;
  data: Event;
}

export type UpdateEvent = Partial<Event> & { eventId: string };

export const createEvent = async (eventData: Event): Promise<EventResponse> => {
    try {
      const { data } = await axios.post<EventResponse>(
        `${API_URL}/Event/create-event`,
        eventData
      );;
      console.log("Event created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Event creation failed.");
    }
}

// For Event Patch

export const updateEvent = async (eventData: UpdateEvent): Promise<EventResponse> => {
  const {eventId, ...updateData} = eventData;
  try {
    const { data } = await axios.patch<EventResponse>(
      `${API_URL}/Event/update-event/${eventId}`,
      updateData
      );;
    console.log("Event updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Event update failed.");
  }
}

