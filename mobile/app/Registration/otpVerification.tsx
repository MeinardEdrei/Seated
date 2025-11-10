import React, { useState, useRef, useEffect } from "react";
import styles from "../Styles/otpVerificationStyles";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useEmailSignUp, useEmailLogin } from "@/auth/authService"; 
import { useGlobalSearchParams } from "expo-router";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const params = useGlobalSearchParams();
  const email = params.email as string;
  const isSignUp = params.isSignUp === "true"; 

  const { verifyOtpAndSignUp, sendOtp: sendSignUpOtp } = useEmailSignUp();
  const { verifyAndLogin, sendLoginOtpCode } = useEmailLogin();

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

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      
      try {
        if (isSignUp) {
          await sendSignUpOtp(email);
        } else {
          await sendLoginOtpCode(email);
        }
        Alert.alert("Success", "OTP has been resent to your email.");
        inputRefs.current[0]?.focus();
      } catch (error) {
        console.error("Resend OTP Error:", error);
        Alert.alert("Error", "Failed to resend OTP. Please try again.");
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete OTP code");
      return;
    }

    console.log(
      `Verifying OTP for ${isSignUp ? "signup" : "login"}:`,
      email,
      "OTP Code:",
      otpCode
    );

    try {
      if (isSignUp) {
        const success = await verifyOtpAndSignUp(email, otpCode);
        if (success) {
          Alert.alert("Success", "Account created successfully!");
        } else {
          Alert.alert("Error", "OTP verification failed. Please try again.");
        }
      } else {
        const result = await verifyAndLogin(email, otpCode);
        if (result.success) {
          Alert.alert("Success", "Logged in successfully!");
        } else {
          Alert.alert("Error", "Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      Alert.alert("Error", "Verification failed. Please try again.");
    }
  };

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

              <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    isButtonDisabled && styles.buttonDisabled,
                  ]}
                  onPress={handleVerify}
                  disabled={isButtonDisabled}
                >
                  <Text style={styles.signUpButtonText}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
