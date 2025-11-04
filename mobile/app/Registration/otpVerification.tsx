import React, { useState, useRef, useEffect } from "react";
import styles from "../Styles/otpVerificationStyles";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleBack = () => router.back();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      Alert.alert("Success", "OTP has been resent to your email address");
      inputRefs.current[0]?.focus();
    }
  };

  const handleSignUp = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete OTP code");
      return;
    }
    Alert.alert("Success", `OTP Verified: ${otpCode}`);
    // Add your verification logic here
  };

  // Disable button if input is blank or loading
  const isButtonDisabled = otp.some((digit) => digit === "");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTop}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                  >
                    <ChevronLeft size={24} color="#941418" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>OTP Verification</Text>
                </View>
                <View style={styles.dividerLine} />
              </View>

              {/* Content */}
              <View style={styles.content}>
                <View style={styles.contentInner}>
                  <Text style={styles.description}>
                    A one-time password (OTP) has been sent to your email
                    address. Enter the code to proceed.
                  </Text>

                  <View>
                    <View style={styles.otpContainer}>
                      {otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={(ref) => {
                            inputRefs.current[index] = ref;
                          }}
                          style={styles.otpInput}
                          value={digit}
                          onChangeText={(text) => handleChange(text, index)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          keyboardType="number-pad"
                          maxLength={1}
                          selectTextOnFocus
                        />
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={handleResend}
                      disabled={!canResend}
                      style={styles.resendButton}
                    >
                      <Text
                        style={[
                          styles.resendText,
                          !canResend && styles.resendTextDisabled,
                        ]}
                      >
                        Resend Code {!canResend && `(${timer}s)`}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.illustrationContainer}>
                    <Image
                      source={require("../../assets/images/illustration3.png")}
                      style={styles.illustration3}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>

              {/* Sign Up Button */}
              <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    isButtonDisabled && styles.buttonDisabled,
                  ]}
                  onPress={handleSignUp}
                  disabled={isButtonDisabled}
                >
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
