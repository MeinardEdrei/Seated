// File: components/StepOne.
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { ImagePlus } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
type StepOneProps = {
  eventName: string;
  setEventName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  imageUri: string | null;
  setImageUri: (uri: string) => void;
  errors: {
    eventName?: string;
    description?: string;
    eventImage?: string;
  };
};

export default function StepOne({
  eventName,
  setEventName,
  description,
  setDescription,
  imageUri,
  setImageUri,
  errors,
}: StepOneProps) {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // You can set the selected image URI to state here if needed
    }
  };
  return (
    <>
      {/* Event Name */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={[styles.input, errors.eventName && styles.errorBorder]}
          value={eventName}
          onChangeText={setEventName}
          placeholder="CCIS General Assembly"
          placeholderTextColor="rgba(28, 28, 28, 0.5)"
        />
        {errors.eventName && (
          <Text style={styles.errorText}>{errors.eventName}</Text>
        )}
      </View>

      {/* Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            errors.description && styles.errorBorder,
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="CCIS General Assembly Lorem ipsum..."
          placeholderTextColor="rgba(28, 28, 28, 0.5)"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
      </View>

      {/* Event Image */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Image</Text>
        <TouchableOpacity
          style={[
            styles.imageUploadContainer,
            errors.eventImage && styles.errorBorder,
          ]}
          onPress={pickImage}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          ) : (
            <>
              <ImagePlus
                size={50}
                color="rgba(28, 28, 28, 0.5)"
                strokeWidth={1.5}
              />
              <Text style={styles.imageUploadText}>Tap to upload image</Text>
            </>
          )}
        </TouchableOpacity>
        {errors.eventImage && (
          <Text style={styles.errorText}>{errors.eventImage}</Text>
        )}
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
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
});
