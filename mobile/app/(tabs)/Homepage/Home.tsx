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

import Header from "../../../components/Header";
import EventDetailsModal from "./components/EventDetailsModal"; // Modal Component
import CancelReservationModal from "./components/CancelReservationModal";

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

  // // Event Details Modal Component
  // const EventDetailsModal = () => (
  //   <Modal
  //     animationType="fade"
  //     transparent={true}
  //     visible={modalVisible}
  //     onRequestClose={handleCloseModal}
  //   >
  //     <View style={modalStyles.modalOverlay}>
  //       {/* Background blur and tap-to-close area */}
  //       <Pressable style={StyleSheet.absoluteFill} onPress={handleCloseModal}>
  //         <BlurView intensity={5} tint="dark" style={modalStyles.blurOverlay} />
  //       </Pressable>

  //       {/* Foreground modal content */}
  //       <View style={modalStyles.modalContainer}>
  //         <ScrollView
  //           showsVerticalScrollIndicator={false}
  //           contentContainerStyle={modalStyles.scrollContent}
  //         >
  //           {/* Close Button */}
  //           <TouchableOpacity
  //             style={modalStyles.closeButton}
  //             onPress={handleCloseModal}
  //           >
  //             <X color="#FFFFFF" size={20} />
  //           </TouchableOpacity>

  //           {/* Event Image */}
  //           <Image
  //             source={require("../../../assets/images/eventImage1.jpg")}
  //             style={modalStyles.eventImage}
  //             resizeMode="cover"
  //           />

  //           {/* Event Details Content */}
  //           <View style={modalStyles.contentContainer}>
  //             <Text style={modalStyles.eventTitle}>{EventData.title}</Text>
  //             <Text style={modalStyles.seatNumber}>
  //               Seat: {EventData.seatNum}
  //             </Text>

  //             <View style={modalStyles.details}>
  //               <Text style={modalStyles.detailContents}>
  //                 Date: {EventData.date}
  //               </Text>
  //             </View>

  //             <View style={modalStyles.details}>
  //               <Text style={modalStyles.detailContents}>
  //                 Time: {EventData.time}
  //               </Text>
  //             </View>

  //             <View style={modalStyles.details}>
  //               <Text style={modalStyles.detailContents}>
  //                 Venue: {EventData.venue}
  //               </Text>
  //             </View>

  //             <View style={modalStyles.divider} />

  //             <Text style={modalStyles.descriptionLabel}>Description:</Text>
  //             <Text style={modalStyles.descriptionText}>
  //               {EventData.description}
  //             </Text>

  //             <View style={modalStyles.divider} />

  //             {/* My Ticket Section */}
  //             <Text style={modalStyles.ticketTitle}>My Ticket</Text>
  //             <Text style={modalStyles.ticketSubtitle}>
  //               Show this QR code to the event's organizer
  //             </Text>

  //             <View style={modalStyles.qrContainer}>
  //               <Image
  //                 source={{ uri: EventData.qrCode }}
  //                 style={modalStyles.qrCode}
  //                 resizeMode="contain"
  //               />
  //             </View>

  //             <View style={modalStyles.divider} />

  //             {/* Action Buttons */}
  //             <View style={modalStyles.buttonContainer}>
  //               <TouchableOpacity
  //                 style={modalStyles.downloadButton}
  //                 onPress={handleDownload}
  //               >
  //                 <Download color="#FFE2A3" size={18} strokeWidth={2.5} />
  //                 <Text style={modalStyles.downloadButtonText}>Download</Text>
  //               </TouchableOpacity>

  //               <TouchableOpacity
  //                 style={modalStyles.cancelButton}
  //                 onPress={handleCancelReservation}
  //               >
  //                 <X color="#525252" size={18} />
  //                 <Text style={modalStyles.cancelButtonText}>
  //                   Cancel Reservation
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </ScrollView>
  //       </View>
  //     </View>
  //   </Modal>
  // );

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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    scrollContent: {
      flex: 1,
    },
    scrollContentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      paddingBottom: 100,
    },

    // ===== Empty State =====
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginBottom: 32,
    },
    illustration5: {
      width: 280,
      height: 280,
      opacity: 0.3,
      resizeMode: "contain",
    },
    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "bold",
      color: "#1C1C1C",
      textAlign: "center",
    },
    subtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
      marginBottom: 32,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#941418",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: 270,
      height: 50,
    },
    buttonText: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },

    // ===== Event Card State =====
    eventCard: {
      marginTop: 0,
      alignItems: "center",
      justifyContent: "center",
      width: 340,
      height: 690,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.3)",
      borderRadius: 20,
      paddingVertical: 35,
      paddingHorizontal: 35,

      // Drop shadow from Figma settings
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2, // 20% opacity
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },

    eventHeader: {
      width: 270,
      // marginBottom: 16, // margin for my ticket text
      // paddingBottom: 20, // padding between more details and line
      // borderBottomWidth: 1,
      // borderBottomColor: "#F3F4F6",
    },
    eventTitle: {
      fontFamily: "Poppins-Semibold",
      fontSize: 18,
      color: "#1C1C1C",
      // marginBottom: 8,
    },
    eventSeat: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "#941418",
      marginBottom: 8,
    },
    eventDate: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "rgba(28, 28, 28, 0.8)",
      // marginBottom: 4,
    },
    eventTime: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "rgba(28, 28, 28, 0.8)",
      // marginBottom: 5,
    },
    moreDetails: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#941418",
      textDecorationLine: "underline",
    },
    // ===== Divider =====
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 16,
      opacity: 0.3,
      width: "100%",
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#525252",
    },

    ticketSection: {
      alignItems: "center",
      // marginBottom: 24,
    },
    ticketTitle: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "bold",
      color: "#1C1C1C",
      // marginBottom: 4,
    },
    ticketSubtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#525252",
      marginBottom: 8,
      textAlign: "center",
      // paddingHorizontal: 20,
    },
    // qrContainer: {
    //   backgroundColor: "#FFFFFF",
    //   padding: 16,
    //   borderRadius: 8,
    //   borderWidth: 1,
    //   borderColor: "#E5E7EB",
    // },
    qrCode: {
      width: 270,
      height: 275,
    },
    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    downloadButton: {
      backgroundColor: "#941418",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: 270,
      height: 50,
      gap: 5,
    },
    downloadButtonText: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },
    cancelButton: {
      backgroundColor: "#EFEFEF",
      borderColor: "rgba(82, 82, 82, 0.3)",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: 270,
      height: 50,
      borderWidth: 1,
      opacity: 0.7,
      gap: 5,
    },
    cancelButtonText: {
      color: "#525252",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },

    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
    },
    iconContainer: {
      marginBottom: 8,
    },
    errorCircle: {
      width: 40,
      height: 40,
      borderRadius: 40,
      backgroundColor: "#D91818",
      justifyContent: "center",
      alignItems: "center",
    },
    // title: {
    //   fontFamily: "Poppins-Bold",
    //   fontSize: 24,
    //   color: "#D91818",
    //   marginBottom: 8,
    //   textAlign: "center",
    // },
    message: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      width: 254,
      color: "#525252",
      textAlign: "center",
      marginBottom: 32,
    },

    // ===== Bottom Navigation =====
    // bottomNav: {
    //   flexDirection: "row",
    //   backgroundColor: "#FFFFFF",
    //   borderTopWidth: 1,
    //   borderTopColor: "#E5E7EB",
    //   paddingHorizontal: 24,
    //   paddingVertical: 12,
    //   justifyContent: "space-between",
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: -2 },
    //   shadowOpacity: 0.05,
    //   shadowRadius: 4,
    //   elevation: 8,
    // },
    // navItem: {
    //   alignItems: "center",
    //   gap: 4,
    // },
    // navIconContainer: {
    //   width: 40,
    //   height: 40,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // navIconActive: {
    //   width: 40,
    //   height: 40,
    //   backgroundColor: "#991B1B",
    //   borderRadius: 12,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // navIcon: {
    //   fontSize: 20,
    // },
    // navLabel: {
    //   fontSize: 11,
    //   color: "#6B7280",
    // },
    // navLabelActive: {
    //   fontSize: 11,
    //   fontWeight: "600",
    //   color: "#991B1B",
    // },
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <Header />

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
};

export default Home;
