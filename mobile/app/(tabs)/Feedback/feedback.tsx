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
import styles from "./styles/feedbackStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import FeedbackForm from "./components/feedbackForm"; // Import the modal

const Feedback = () => {
  const router = useRouter();
  const handleSettings = () => {
    router.push("/(tabs)/Homepage/components/settings");
  };

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
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/header-logo.png")}
            style={styles.headerLogo}
          />
        </View>
        <TouchableOpacity onPress={handleSettings}>
          <Settings size={24} strokeWidth={2} color="#941418" />
        </TouchableOpacity>
      </View>

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
