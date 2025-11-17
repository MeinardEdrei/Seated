import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Download, X } from "lucide-react-native";

interface EventDetailsModalProps {
  visible: boolean;
  eventData: {
    title: string;
    seatNum: string;
    date: string;
    time: string;
    venue: string;
    description: string;
    qrCode: string;
  };
  onClose: () => void;
  onDownload: () => void;
  onCancelReservation: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  visible,
  eventData,
  onClose,
  onDownload,
  onCancelReservation,
}) => {
  const { width, height } = Dimensions.get("window");
  const modalStyles = StyleSheet.create({
    blurOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // Add fallback semi-transparent color if blur isn't supported
      backgroundColor: "rgba(28, 28, 28, 0.75)",
    },
    modalOverlay: {
      flex: 1,
      // backgroundColor: "rgba(0, 0, 0, 0.8)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      // width: width * 0.9,
      width: "100%",
      // width: "100%",
      maxHeight: height * 0.73,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      overflow: "hidden",
    },
    scrollContent: {
      flexGrow: 1,
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
      opacity: 0.5,
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      // borderRadius: 20,
      // padding: 8,
    },
    eventImage: {
      width: "100%",
      height: 190,
    },
    contentContainer: {
      padding: 35,
    },
    eventTitle: {
      fontFamily: "Poppins-Semibold",
      fontSize: 18,
      color: "#000000",
    },
    seatNumber: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "#941418",
      marginBottom: 8,
    },
    details: {
      // flexDirection: "row",
      marginBottom: 0,
    },
    detailContents: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "rgba(28, 28, 28, 0.8)",
      // width: 60,
    },
    divider: {
      height: 1,
      backgroundColor: "rgba(82, 82, 82, 0.3)",
      marginVertical: 16,
    },
    descriptionLabel: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "rgba(28, 28, 28, 0.8)",
      // marginBottom: 8,
    },
    descriptionText: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "rgba(28, 28, 28, 0.8)",
      // lineHeight: 20,
    },
    ticketTitle: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      color: "#1C1C1C",
      textAlign: "center",
    },
    ticketSubtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#525252",
      textAlign: "center",
      marginBottom: 8,
    },
    qrContainer: {
      alignItems: "center",
      marginBottom: 0,
    },
    qrCode: {
      width: 200,
      height: 203,
    },
    buttonContainer: {
      gap: 12,
    },
    downloadButton: {
      backgroundColor: "#941418",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: "100%",
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
      width: "100%",
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
  });
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        {/* Background blur and tap-to-close area */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
          <BlurView intensity={5} tint="dark" style={modalStyles.blurOverlay} />
        </Pressable>

        {/* Foreground modal content */}
        <View style={modalStyles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={modalStyles.scrollContent}
          >
            {/* Close Button */}
            <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
              <X color="#FFFFFF" size={20} />
            </TouchableOpacity>

            {/* Event Image */}
            <Image
              source={require("../../../../assets/images/eventImage1.jpg")}
              style={modalStyles.eventImage}
              resizeMode="cover"
            />

            {/* Event Details Content */}
            <View style={modalStyles.contentContainer}>
              <Text style={modalStyles.eventTitle}>{eventData.title}</Text>
              <Text style={modalStyles.seatNumber}>
                Seat: {eventData.seatNum}
              </Text>

              <View style={modalStyles.details}>
                <Text style={modalStyles.detailContents}>
                  Date: {eventData.date}
                </Text>
              </View>

              <View style={modalStyles.details}>
                <Text style={modalStyles.detailContents}>
                  Time: {eventData.time}
                </Text>
              </View>

              <View style={modalStyles.details}>
                <Text style={modalStyles.detailContents}>
                  Venue: {eventData.venue}
                </Text>
              </View>

              <View style={modalStyles.divider} />

              <Text style={modalStyles.descriptionLabel}>Description:</Text>
              <Text style={modalStyles.descriptionText}>
                {eventData.description}
              </Text>

              <View style={modalStyles.divider} />

              {/* My Ticket Section */}
              <Text style={modalStyles.ticketTitle}>My Ticket</Text>
              <Text style={modalStyles.ticketSubtitle}>
                Show this QR code to the event's organizer
              </Text>

              <View style={modalStyles.qrContainer}>
                <Image
                  source={{ uri: eventData.qrCode }}
                  style={modalStyles.qrCode}
                  resizeMode="contain"
                />
              </View>

              <View style={modalStyles.divider} />

              {/* Action Buttons */}
              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  style={modalStyles.downloadButton}
                  onPress={onDownload}
                >
                  <Download color="#FFE2A3" size={18} strokeWidth={2.5} />
                  <Text style={modalStyles.downloadButtonText}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={modalStyles.cancelButton}
                  onPress={onCancelReservation}
                >
                  <X color="#525252" size={18} />
                  <Text style={modalStyles.cancelButtonText}>
                    Cancel Reservation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailsModal;
