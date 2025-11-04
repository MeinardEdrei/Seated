import React from "react";
import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { X } from "lucide-react-native";
import { BlurView } from "expo-blur";
import styles from "../Styles/InvalidModalStyles";

//Define prop types for clarity and type safety
interface InvalidEmailModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function InvalidEmailModal({
  visible,
  onClose,
}: InvalidEmailModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        {/* ✅ Blur background */}
        <BlurView intensity={5} tint="dark" style={styles.blurOverlay}>
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
              We couldn't find an account associated with this email. Please
              check for typos or sign up first.
            </Text>

            {/* Try Again Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
}
