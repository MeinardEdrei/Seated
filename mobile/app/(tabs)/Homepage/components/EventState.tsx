import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import {useState} from "react";
import EventDetailsModal from ".//EventDetailsModal"; 
import CancelReservationModal from "./CancelReservationModal";
import {Download, X} from "lucide-react-native";

export default function EventState({EventData}: {EventData: any}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const styles = StyleSheet.create({
    scrollContent: {
      flex: 1,
    },
    scrollContentContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      paddingBottom: 100,
    },

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

      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2, 
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },

    eventHeader: {
      width: 270,
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
    },
    moreDetails: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#941418",
      textDecorationLine: "underline",
    },
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
    },
    ticketTitle: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "bold",
      color: "#1C1C1C",
    },
    ticketSubtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#525252",
      marginBottom: 8,
      textAlign: "center",
    },
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

    message: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      width: 254,
      color: "#525252",
      textAlign: "center",
      marginBottom: 32,
    },
  });

  const handleMoreDetails = () => {
    setModalVisible(true);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download ticket");
  };


  const eventDetailModal = (
    modalVisible: boolean, 
    eventData: any,
    onClose: () => void,
    onDownload: () => void,
    onCancelReservation: () => void
  ) => {
    return (

      <EventDetailsModal
        visible={modalVisible}
        eventData={eventData}
        onClose={onClose}
        onDownload={onDownload}
        onCancelReservation={onCancelReservation}
      />

    );
  }

  const cancelReservationModal = (
    cancelModalVisible: boolean,
    onClose: () => void,
    onConfirm: () => void,
    seatNumber: string
  ) => {
    return (
      <CancelReservationModal
        visible={cancelModalVisible}
        onClose={onClose}
        onConfirm={onConfirm}
        seatNumber={seatNumber}
      />
    );
  }
  return (
    <ScrollView
      style={styles.scrollContent}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.eventCard}>
        {/* Event Info Header */}
        <View style={styles.eventHeader}>
          <View>
            <Text style={styles.eventTitle}>{EventData}</Text>
            <Text style={styles.eventSeat}>Seat: {EventData}</Text>
            <Text style={styles.eventDate}>Date: {EventData}</Text>
            <Text style={styles.eventTime}>Time: {EventData}</Text>
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
              source={{ uri: EventData }}
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
}
