import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { X } from "lucide-react-native";
import { BlurView } from "expo-blur";

//Define prop types for clarity and type safety
interface InvalidEmailModalProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
}

export default function InvalidEmailModal({
  visible,
  onClose,
  message = "We couldn't find an account associated with this email. Please check for typos or sign up first.",
}: InvalidEmailModalProps) {
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      // backgroundColor: "rgba(28, 28, 28, 0.75)",
      justifyContent: "center",
      alignItems: "center",
    },
    blurOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // Add fallback semi-transparent color if blur isn't supported
      backgroundColor: "rgba(28, 28, 28, 0.75)",
    },

    modalContainer: {
      width: 290,
      height: 265,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",

      // padding: 24,
      // shadowColor: "#ff0000ff",
      // shadowOffset: {
      //   width: 0,
      //   height: 4,
      // },
      // shadowOpacity: 0.3,
      // shadowRadius: 8,
      // elevation: 8,
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
    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      color: "#D91818",
      marginBottom: 8,
      textAlign: "center",
    },
    message: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      width: 254,
      color: "#525252",
      textAlign: "center",
      marginBottom: 32,
    },
    button: {
      backgroundColor: "#941418",
      borderRadius: 5,
      width: 116,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "#FFFFFF",
      textAlign: "center",
    },
  });
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* can exit even by tapping the background */}
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
              {message}
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
