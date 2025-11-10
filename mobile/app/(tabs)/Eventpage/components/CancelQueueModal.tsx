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
import styles from "../styles/CancelQueueModalStyles"

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
