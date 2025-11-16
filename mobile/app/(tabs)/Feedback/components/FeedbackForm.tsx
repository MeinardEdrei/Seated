import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import styles from "../styles/FeedbackFormStyles";
import { X } from "lucide-react-native";
import { BlurView } from "expo-blur";

interface FeedbackFormProps {
  visible: boolean;
  onClose: () => void;
  eventTitle?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  visible,
  onClose,
  eventTitle,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");

  const experienceOptions = [
    "Smooth Experience",
    "Confusing",
    "Engaging",
    "Boring",
    "Not engaging",
    "So Dragging",
  ];

  const ratingOptions = [
    "Very Excellent",
    "Excellent",
    "Good",
    "Fair",
    "Poor",
    "Need improvement",
  ];

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      experience: selectedExperience,
      rating: selectedRating,
    });

    // Reset form and close
    setSelectedExperience("");
    setSelectedRating("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Background blur and tap-to-close area */}
        <Pressable
          style={[StyleSheet.absoluteFill, styles.overlayTouchable]}
          onPress={onClose}
        >
          <BlurView intensity={5} tint="dark" style={styles.blurOverlay} />
        </Pressable>
        <View style={styles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} strokeWidth={2} color="rgba(82, 82, 82, 0.6)" />
            </TouchableOpacity>

            {/* Question 1 */}
            <Text style={styles.questionTitle}>
              1. How was the event for you?
            </Text>

            <View style={styles.optionsContainer}>
              {experienceOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedExperience === option && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedExperience(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedExperience === option &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            {/* <View style={styles.divider} /> */}

            {/* Question 2 */}
            <Text style={styles.questionTitle}>
              2. Rate your overall experience
            </Text>

            <View style={styles.optionsContainer}>
              {ratingOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedRating === option && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedRating(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedRating === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            {/* <View style={styles.divider} /> */}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!selectedExperience || !selectedRating) &&
                  styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!selectedExperience || !selectedRating}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  (!selectedExperience || !selectedRating) &&
                    styles.submitButtonTextDisabled,
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackForm;
