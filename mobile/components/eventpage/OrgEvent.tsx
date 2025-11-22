import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList, 
} from "react-native";
import { CirclePlus } from "lucide-react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Event, listEventsByOrganizer } from "@/api/event";
import { format } from 'date-fns';
export default function OrgEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleCreateEvent = () => {
    router.push("/EventCreation/CreateEventForm");
  };
  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        setIsLoading(true);
        try {
          const response = await listEventsByOrganizer();
          setEvents(response.data);
          console.log("Fetched Events:", response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvents();
    }, [])
  );
  const EmptyState = () => (
    <View style={styles.emptyContent}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/illustration9.png")}
          style={styles.illustration9}
        />
      </View>

      <Text style={styles.title}>No events yet</Text>
      <Text style={styles.subtitle}>
        Time to get started! Tap the 'Create Event' button below to plan your
        event.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <CirclePlus size={20} color="#ffe2a3" strokeWidth={2.5} />
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#941418" />
          </View>
        ) : events.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.eventId.toString()}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                {item.imageUrl && (
                  <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
                )}
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.eventName}</Text>
                  <Text style={styles.eventDescription}>{item.description}</Text>
                  <Text style={styles.eventDate}>
                    Date: {format(new Date(item.eventDate), 'PPP')}
                  </Text>
                  <Text style={styles.eventTime}>
                    Time: {format(new Date(`2000-01-01T${item.startTime}`), 'p')} - {format(new Date(`2000-01-01T${item.endTime}`), 'p')}
                  </Text>
                  <Text style={styles.eventStatus}>Status: {item.status}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.eventListContentContainer}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // ===== Empty State =====
  emptyContent: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 250,
    // marginHorizontal: 50,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
  },
  illustration9: {
    width: 200,
    height: 200,
    opacity: 1,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    textAlign: "center",
    marginBottom: 48,
  },

  button: {
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 10,
    width: 270,
    height: 50,
  },
  buttonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  // New styles for event list container
  eventListContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.1)",
    flexDirection: 'row', // Added to support image and details side-by-side
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'cover',
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#1C1C1C",
    marginBottom: 4,
  },
  eventDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    marginBottom: 4,
  },
  eventDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },
  eventTime: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },
  eventStatus: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "#941418",
    marginTop: 4,
  }
});
