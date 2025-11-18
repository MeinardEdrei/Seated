import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "../../../components/Header";
import FeedbackForm from "./components/FeedbackForm"; // Import the modal

const Feedback = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("pending");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events = [
    {
      id: 1,
      title: "CCIS: General Meeting 2025",
      date: "October 25, 2025",
      time: "01:00 PM - 04:30 PM",
      venue: "UMak Performing Arts Theater",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
    {
      id: 2,
      title: "CCIS: Yearner Assembly 2025",
      date: "October 25, 2025",
      time: "01:00 PM - 04:30 PM",
      venue: "UMak Performing Arts Theater",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    },
  ];

  const submittedEvents = [
    {
      id: 3,
      title: "CCIS: Tech Summit 2025",
      date: "September 15, 2025",
      time: "09:00 AM - 05:00 PM",
      venue: "UMak Performing Arts Theater",
      status: "Submitted",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    },
  ];

  const displayEvents = activeTab === "pending" ? events : submittedEvents;

  type Event = {
    id: number;
    title: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    image: string;
  };

  const handleFeedbackPress = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffffff",
    },

    headerText: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      marginTop: 16,
      marginBottom: 16,
    },
    headerTitle: {
      fontFamily: "Poppins-Semibold",
      fontSize: 18,
      color: "#1C1C1C",
      // marginBottom: 8,
    },
    headerSubtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
    },

    tabContainer: {
      flexDirection: "row",
      marginHorizontal: 16,
      marginBottom: 24,
      gap: 8,
    },
    tab: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.7)",
    },
    activeTab: {
      backgroundColor: "#941418",
      borderColor: "#941418",
    },
    tabText: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "rgba(82, 82, 82, 0.7)",
    },
    activeTabText: {
      color: "#FFE2A3",
    },

    scrollView: {
      flex: 1,
    },
    scrollContent: {
      marginHorizontal: 40,
      marginBottom: 100,
      // padding: 16,
      gap: 16,
    },
    card: {
      backgroundColor: "#ffffffff",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.2)",
      borderRadius: 20,
      overflow: "hidden",

      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2, // 20% opacity
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },
    cardImage: {
      width: "100%",
      height: 120,
      resizeMode: "cover",
    },
    cardContent: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      // padding: 25,
    },
    eventTitle: {
      fontFamily: "Poppins-Semibold",
      fontSize: 16,
      color: "#1C1C1C",
      marginBottom: 5,
    },
    eventDetail: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "rgba(82, 82, 82, 0.8)",
    },
    statusBadge: {
      backgroundColor: "#525252",
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 16,
    },
    statusText: {
      color: "#fff",
      fontFamily: "Poppins-Regular",
      fontSize: 12,
    },
    feedbackButton: {
      backgroundColor: "#941418",
      height: 40,
      // paddingVertical: 14,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    feedbackButtonText: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },
  });
  const EventCard = ({ event }: { event: Event }) => {
    const isSubmitted = event.status === "Submitted";

    return (
      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetail}>Date: {event.date}</Text>
          <Text style={styles.eventDetail}>Time: {event.time}</Text>
          <Text style={styles.eventDetail}>Venue: {event.venue}</Text>

          {/* Dynamic badge color */}
          <View
            style={[
              styles.statusBadge,
              isSubmitted && { backgroundColor: "#1C7500", marginBottom: 0 }, // Green if submitted
            ]}
          >
            <Text style={styles.statusText}>Status: {event.status}</Text>
          </View>

          {/* Show button only if NOT submitted */}
          {!isSubmitted && (
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={() => handleFeedbackPress(event)}
            >
              <Text style={styles.feedbackButtonText}>
                {event.status === "Pending" ? "Send Feedback" : "View Feedback"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <Header />

      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>Share your feedback</Text>
        <Text style={styles.headerSubtitle}>
          Please share your experience about the event.
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "pending" && styles.activeTabText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "submitted" && styles.activeTab]}
          onPress={() => setActiveTab("submitted")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "submitted" && styles.activeTabText,
            ]}
          >
            Submitted
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>

      {/* Feedback Modal */}
      <FeedbackForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        eventTitle={selectedEvent?.title}
      />
    </SafeAreaView>
  );
};

export default Feedback;
