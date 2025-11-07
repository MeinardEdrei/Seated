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
} from "react-native";
import { BlurView } from "expo-blur";
import { Download, X } from "lucide-react-native";
import modalStyles from "../styles/_eventDetailsModalStyles"; // adjust path if needed

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
