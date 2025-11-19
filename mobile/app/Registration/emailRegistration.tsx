import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft, Mail } from "lucide-react-native";
import { useEmailSignUp } from "@/auth/authService";

export default function EmailRegistration() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { sendOtp, isSigningUp } = useEmailSignUp();
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOTP = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("*You’ve entered an invalid email address.");
      return;
    }

    setLoading(true);

    try {
      const success = await sendOtp(email.trim());
      setLoading(false);
      if (success) {
        router.push({
          pathname: "/Registration/otpVerification",
          params: { email: email.trim(), isSignUp: "true" },
        });
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleBack = () => router.back();

  // ✅ Disable button if input is blank or loading
  const isButtonDisabled = !email.trim() || loading;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      justifyContent: "center", // centers vertically
      alignItems: "center", // centers horizontally
      paddingVertical: 6,
    },
    // Header
    header: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      // paddingBottom: 14,
    },

    headerTop: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      // paddingBottom: 14,
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

    content: {
      width: 340,
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "bold",
      color: "#1C1C1C",
      marginBottom: 5,
    },
    subtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
      // lineHeight: 20,
      marginBottom: 33,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 32,
    },

    label: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: "#1C1C1C",
      marginBottom: 8, // increased a bit for spacing
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#EFEFEF",
      borderColor: "#525252",
      borderWidth: 1,
      borderRadius: 10,
      height: 50, // fixed height for consistency
      paddingHorizontal: 16,
    },

    input: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      fontSize: 15,
      color: "#1C1C1C",
      marginLeft: 10,
    },

    inputErrorBorder: {
      borderColor: "#D91818",
    },

    errorText: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#D91818",
      marginTop: 5,
    },

    illustrationContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    illustration: {
      flex: 1,
      alignItems: "center",
    },
    illustration2: {
      width: 330,
      height: 330,
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    button: {
      backgroundColor: "#941418",
      width: 340,
      height: 50,
      // paddingVertical: 16,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 20,
    },

    buttonDisabled: {
      backgroundColor: "#941418",
      opacity: 0.5,
    },

    buttonText: {
      fontFamily: "Poppins-Bold",
      color: "#FFE2A3",
      fontSize: 14,
    },
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView
        style={[styles.container]}
        edges={["top", "left", "right", "bottom"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBack}
                >
                  <ChevronLeft size={24} color="#941418" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sign up with email</Text>
              </View>
              <View style={styles.dividerLine} />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
              <Text style={styles.title}>
                Ready to reserve? Just use your email!
              </Text>
              <Text style={styles.subtitle}>
                Sign up with your email address for secure, one-tap access to
                all your seat bookings.
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    error ? styles.inputErrorBorder : {},
                  ]}
                >
                  <Mail size={20} color={"#525252"} opacity={0.7} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="rgba(82, 82, 82, 0.7)"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) setError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              {/* Illustration */}
              <View style={styles.illustrationContainer}>
                <Image
                  source={require("../../assets/images/illustration2.png")}
                  style={styles.illustration2}
                />
              </View>

              {/* Send OTP Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    (isButtonDisabled || loading) && styles.buttonDisabled,
                  ]}
                  onPress={handleSendOTP}
                  disabled={isButtonDisabled}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFE2A3" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
