import React from "react";
import {
  Modal,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";

interface CancelReservationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  seatNumber?: string;
}

const CancelReservationModal: React.FC<CancelReservationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  seatNumber = "H62",
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Background blur and tap-to-close area */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
          <BlurView intensity={5} tint="dark" style={styles.blurOverlay} />
        </Pressable>

        {/* Modal Content */}
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} strokeWidth={2} color="rgba(82, 82, 82, 0.6)" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Cancel Reservation</Text>

          {/* Message */}
          <Text style={styles.message}>
            Are you sure you want to cancel your seat reservation? You might
            lose your spot for this event.
          </Text>

          {/* Seat Icon and Number */}
          <View style={styles.seatContainer}>
            <View style={styles.seatIcon}>
              <Image
                source={require("../../../../assets/images/illustration6.png")}
                style={styles.illustration6}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.seatNumber}>Seat {seatNumber}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelReservationModal;

const styles = StyleSheet.create({
  blurOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Add fallback semi-transparent color if blur isn't supported
    backgroundColor: "rgba(28, 28, 28, 0.75)",
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 255, 85, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 340,
    // height: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    // padding: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 5,
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
    textAlign: "center",
    // lineHeight: 20,
    marginBottom: 16,
    // paddingHorizontal: 5,
  },
  seatContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  seatIcon: {
    position: "relative",
    marginBottom: 0,
  },
  illustration6: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  seatNumber: {
    fontFamily: "Poppins-Black",
    fontSize: 40,
    color: "#941418",
    // letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderColor: "#5252524d",
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 10,
    width: 135,
    height: 50,
    // paddingVertical: 14,
  },
  cancelButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#525252",
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 50,
    backgroundColor: "#941418",
    borderRadius: 10,
    paddingVertical: 14,
  },
  confirmButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
