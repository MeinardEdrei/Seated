import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CirclePlus } from "lucide-react-native";

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Event, listEventsByOrganizer } from "@/api/event";

export default function OrgEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleCreateEvent = () => {
    router.push("/EventCreation/CreateEventForm");
  };

  const fetchEvents = async () => {
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

  useEffect(() => {
    fetchEvents();
  }, []); 

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
          <View style={styles.eventListContainer}>
            <Text style={styles.eventListText}>Events are loaded!</Text>
          </View>
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
  eventListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  eventListText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#1C1C1C",
  },
});
