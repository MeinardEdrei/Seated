// File: CreateEvent.js (Main component)
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { createEvent } from "@/api/event";
import { parse, format } from 'date-fns';

export default function CreateEvent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Details
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventImage, setEventImage] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    eventName: "",
    description: "",
    eventImage: "",
  });
  // Step 2 - Schedule
  const [eventDate, setEventDate] = useState("October 25, 2025");
  const [startTime, setStartTime] = useState("10:30 AM");
  const [endTime, setEndTime] = useState("01:30 PM");

  // Step 3 - Venue
  const [selectedVenue, setSelectedVenue] = useState<number | null>(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const newErrors = {
        eventName: !eventName ? "*Event Name cannot be empty" : "",
        description: !description ? "*Description cannot be empty" : "",
        eventImage: !eventImage ? "*Event Image cannot be empty" : "",
      };
      setErrors(newErrors);
      if (Object.values(newErrors).some((error) => error)) {
        return;
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("EventName", eventName);
    formdata.append("Description", description);

    try {
      const parsedDate = parse(eventDate, 'MMMM d, yyyy', new Date());
      const finalDate = format(parsedDate, 'yyyy-MM-dd');

      formdata.append("EventDate", finalDate);

      const parsedStartTime = parse(startTime, 'hh:mm a', new Date());
      const formattedStartTime = format(parsedStartTime, 'HH:mm:ss');

      formdata.append("StartTime", formattedStartTime);

      const parsedEndTime = parse(endTime, 'hh:mm a', new Date());
      const formattedEndTime = format(parsedEndTime, 'HH:mm:ss');

      formdata.append("EndTime", formattedEndTime);

    } catch (error) {
      console.error("Error formatting date/time:", error);
    }


    formdata.append(
      "VenueId",
      selectedVenue ? selectedVenue.toString() : "",
    );

    if (eventImage) {
      const filename = eventImage.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : `image`;

      formdata.append("ImageFile", {
        uri: eventImage,
        name: filename,
        type: type,
      } as any);
    }

    setIsSubmitting(true);
    try {
      await createEvent(formdata);
      Alert.alert("Success", "Event created successfully!", [{ text: "OK" }]);

    } catch (error: any) {
      console.log("Form Data:", formdata);
      console.error("Error submitting event:", error);
      throw new Error(error);
    } finally {
      setIsSubmitting(false);
      router.back();
    }
  };

  type StepIndicatorProps = {
    stepNumber: number;
    label: string;
    isActive: boolean;
  };

  type StepConnectorProps = {
    isActive: boolean;
  };

  const StepIndicator = ({
    stepNumber,
    label,
    isActive,
  }: StepIndicatorProps) => (
    <View style={styles.stepContainer}>
      <View
        style={[
          styles.stepCircle,
          isActive ? styles.stepCircleActive : styles.stepCircleInactive,
        ]}
      >
        <Text
          style={[
            styles.stepNumber,
            isActive ? styles.stepNumberActive : styles.stepNumberInactive,
          ]}
        >
          {stepNumber}
        </Text>
      </View>
      <Text
        style={[
          styles.stepLabel,
          isActive ? styles.stepLabelActive : styles.stepLabelInactive,
        ]}
      >
        {label}
      </Text>
    </View>
  );

  const StepConnector = ({ isActive }: StepConnectorProps) => (
    <View
      style={[styles.stepConnector, isActive && styles.stepConnectorActive]}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#941418" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.bodyContainer}>
        {/* Step Indicators */}
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepRow}>
            <StepIndicator
              stepNumber={1}
              label="Details"
              isActive={currentStep >= 1}
            />
            <StepConnector isActive={currentStep >= 2} />
            <StepIndicator
              stepNumber={2}
              label="Schedule"
              isActive={currentStep >= 2}
            />
            <StepConnector isActive={currentStep >= 3} />
            <StepIndicator
              stepNumber={3}
              label="Venue"
              isActive={currentStep >= 3}
            />
          </View>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 1 && (
            <StepOne
              eventName={eventName}
              setEventName={setEventName}
              description={description}
              setDescription={setDescription}
              imageUri={eventImage}
              setImageUri={setEventImage}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              eventDate={eventDate}
              setEventDate={setEventDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              selectedVenue={selectedVenue}
              setSelectedVenue={setSelectedVenue}
            />
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          {/* OPTIONAL: Step 1: Only Next (if you want) */}
          {currentStep === 1 && (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <ChevronRight size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2: Back + Next */}
          {currentStep === 2 && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.backButtonBottom}
                onPress={handleBack}
              >
                <ChevronLeft size={20} color="#941418" strokeWidth={2.5} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <ChevronRight size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          )}
          {/* STEP 3: Back + Submit */}
          {currentStep === 3 && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.backButtonBottom}
                onPress={handleBack}
              >
                <ChevronLeft size={20} color="#941418" strokeWidth={2.5} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isSubmitting} // Disable button when submitting
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" /> // Show loading indicator
                ) : (
                  <>
                    <Text style={styles.submitButtonText}>Submit</Text>
                    <ChevronRight size={20} color="#fff" strokeWidth={2.5} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Header
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTop: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#941418",
    textAlign: "center",
  },
  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#525252",
    opacity: 0.5,
    marginTop: 14,
    marginBottom: 25,
  },

  bodyContainer: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 350,
    width: "100%",
  },

  // Step Indicators
  stepIndicatorContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 32,
  },
  stepContainer: {
    alignItems: "center",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepConnector: {
    width: 65,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(82, 82, 82, 0.5)",
    marginHorizontal: 12,
    marginBottom: 24,
  },
  stepConnectorActive: {
    backgroundColor: "#941418",
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    backgroundColor: "#941418",
  },
  stepCircleInactive: {
    backgroundColor: "rgba(82, 82, 82, 0.5)",
  },
  stepNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  stepNumberActive: {
    color: "#FFE2A3",
  },
  stepNumberInactive: {
    color: "#FFFFFF",
  },
  stepLabel: {
    fontFamily: "Poppins-Regular",
    marginTop: 5,
    fontSize: 12,
  },
  stepLabelActive: {
    color: "#1C1C1C",
  },
  stepLabelInactive: {
    color: "rgba(82, 82, 82, 0.5)",
  },

  // Form
  scrollView: {
    width: "100%",
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    paddingBottom: 20,
  },
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
    paddingHorizontal: 22,
    paddingVertical: 14,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  textArea: {
    height: 150,
    paddingTop: 14,
  },

  // Image Upload
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

  // Date & Time Inputs
  dateInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.5)",
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeInputWrapper: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#1C1C1C",
    marginBottom: 8,
  },
  timeInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.5)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },

  // Venue Cards
  venueCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 28, 0.5)",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  venueImagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  venueImageText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#9CA3AF",
  },
  venueInfo: {
    padding: 16,
  },
  venueHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#941418",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#941418",
  },
  venueName: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
    color: "#1C1C1C",
    flex: 1,
  },
  venueCapacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  venueCapacityText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },
  venueDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(28, 28, 28, 0.7)",
    lineHeight: 18,
  },

  // Bottom Buttons
  bottomContainer: {
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    width: "100%",
    borderTopColor: "#F3F4F6",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
  nextButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  backButtonBottom: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#941418",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
  backButtonText: {
    color: "#941418",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});
