import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { X } from "lucide-react-native";

interface CancelQueueModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const CancelQueueModal: React.FC<CancelQueueModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: Dimensions.get("window").width * 0.85,
      maxWidth: 340,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      padding: 4,
      zIndex: 1,
    },
    title: {
      fontFamily: "Poppins-Semibold",
      fontSize: 20,
      color: "#1C1C1C",
      marginBottom: 12,
      marginTop: 8,
    },
    message: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
      width: "100%",
    },
    cancelButton: {
      flex: 1,
      height: 48,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.3)",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    cancelButtonText: {
      fontFamily: "Poppins-Semibold",
      fontSize: 14,
      color: "#525252",
    },
    confirmButton: {
      flex: 1,
      height: 48,
      backgroundColor: "#941418",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    confirmButtonText: {
      fontFamily: "Poppins-Semibold",
      fontSize: 14,
      color: "#FFFFFF",
    },
  });
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <X size={20} color="#1C1C1C" strokeWidth={2} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Cancel Queue</Text>

          {/* Message */}
          <Text style={styles.message}>
            You'll lose your spot. Are you sure you want to leave the queue?
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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

export default CancelQueueModal;
