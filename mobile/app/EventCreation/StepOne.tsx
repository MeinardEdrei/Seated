// File: components/StepOne.
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ImagePlus } from "lucide-react-native";

type StepOneProps = {
  eventName: string;
  setEventName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
};

export default function StepOne({
  eventName,
  setEventName,
  description,
  setDescription,
}: StepOneProps) {
  return (
    <>
      {/* Event Name */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="CCIS General Assembly"
          placeholderTextColor="rgba(28, 28, 28, 0.5)"
        />
      </View>

      {/* Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="CCIS General Assembly Lorem ipsum..."
          placeholderTextColor="rgba(28, 28, 28, 0.5)"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      {/* Event Image */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Image</Text>
        <TouchableOpacity style={styles.imageUploadContainer}>
          <ImagePlus
            size={50}
            color="rgba(28, 28, 28, 0.5)"
            strokeWidth={1.5}
          />
          <Text style={styles.imageUploadText}>Tap to upload image</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#1C1C1C",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.5)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  textArea: {
    height: 150,
    paddingTop: 14,
  },
  imageUploadContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.5)",
    borderRadius: 10,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  imageUploadText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.5)",
  },
});
