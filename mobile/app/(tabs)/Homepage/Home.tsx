import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Menu, Settings, Download, X } from "lucide-react-native";
import { BlurView } from "expo-blur";

import EventDetailsModal from "./components/EventDetailsModal"; // Modal Component
import CancelReservationModal from "./components/CancelReservationModal";
import styles from "./styles/HomeStyles";
import modalStyles from "./styles/EventDetailsModalStyles";

const { width, height } = Dimensions.get("window");

// Sample event data - replace with actual data from your API/state management
const EventData = {
  title: "CCIS: General Meeting 2025",
  seatNum: "H62",
  date: "October 25, 2025",
  time: "01:00 PM - 04:30 PM",
  venue: "UMak Performing Arts Theater",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea...",
  eventImage:
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=EVENT-IMAGE", // Replace with actual event image URL
  qrCode:
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=CCIS-GM-2025-USER123",
};

const Home = () => {
  const router = useRouter();

  // This should come from your state management (Redux, Context, etc.)
  const [hasEvent, setHasEvent] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSettings = () => {
    router.push("/(tabs)/Homepage/components/Settings");
  };

  const handleJoinEvent = () => {
    router.push("/(tabs)/Eventpage/Event");
    // After successful event join, you would set hasEvent to true
    // setHasEvent(true);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download ticket");
  };

  const confirmCancelReservation = () => {
    setHasEvent(false);
    setModalVisible(false);
    setCancelModalVisible(false);
  };

  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const handleMoreDetails = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Empty Event
  const EmptyState = () => (
    <View style={styles.content}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../../assets/images/illustration5.png")}
          style={styles.illustration5}
        />
      </View>

      <Text style={styles.title}>Empty seat reservation</Text>
      <Text style={styles.subtitle}>You have not join events yet.</Text>

      <TouchableOpacity style={styles.button} onPress={handleJoinEvent}>
        <Text style={styles.buttonText}>Join Event Now!</Text>
      </TouchableOpacity>
    </View>
  );

  // Event Ticket
  const EventState = () => (
    <ScrollView
      style={styles.scrollContent}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.eventCard}>
        {/* Event Info Header */}
        <View style={styles.eventHeader}>
          <View>
            <Text style={styles.eventTitle}>{EventData.title}</Text>
            <Text style={styles.eventSeat}>Seat: {EventData.seatNum}</Text>
            <Text style={styles.eventDate}>Date: {EventData.date}</Text>
            <Text style={styles.eventTime}>Time: {EventData.time}</Text>
            <TouchableOpacity onPress={handleMoreDetails}>
              <Text style={styles.moreDetails}>more details...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
        </View>

        {/* My Ticket Section */}
        <View style={styles.ticketSection}>
          <Text style={styles.ticketTitle}>My Ticket</Text>
          <Text style={styles.ticketSubtitle}>
            Show this QR code to the event's organizer
          </Text>

          {/* QR Code Container */}
          <View>
            <Image
              source={{ uri: EventData.qrCode }}
              style={styles.qrCode}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Download color="#FFE2A3" size={18} strokeWidth={2.5} />
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setCancelModalVisible(true)}
          >
            <X color="#525252" size={18} />
            <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const CancelReservation = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={modalStyles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleCloseModal}>
          <BlurView intensity={5} tint="dark" style={modalStyles.blurOverlay} />
        </Pressable>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <X size={20} strokeWidth={2} color="rgba(82, 82, 82, 0.5)" />
        </TouchableOpacity>

        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.errorCircle}>
            <X size={25} color="#FFFFFF" strokeWidth={3} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Invalid Email</Text>

        {/* Message */}
        <Text style={styles.message}>
          We couldn't find an account associated with this email. Please check
          for typos or sign up first.
        </Text>

        {/* Try Again Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleCloseModal}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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
            {/* <Menu color="#941418" /> */}
          </TouchableOpacity>
        </View>

        {/* Conditional Content Rendering */}
        {hasEvent ? <EventState /> : <EmptyState />}
        {/* Event Details Modal */}
        <EventDetailsModal
          visible={modalVisible}
          eventData={EventData}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          onCancelReservation={() => {
            setCancelModalVisible(true); // show the CancelReservationModal
            setModalVisible(false); // close EventDetailsModal
          }}
        />
        {/* Cancel Reservation Modal */}
        <CancelReservationModal
          visible={cancelModalVisible}
          onClose={() => setCancelModalVisible(false)}
          onConfirm={confirmCancelReservation}
          seatNumber={EventData.seatNum}
        />
      </SafeAreaView>
    </>
  );
}

export default Home;
