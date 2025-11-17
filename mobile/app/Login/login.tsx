import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Mail } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import InvalidEmailModal from "./InvalidEmailModal";
import { useGoogleSignIn, useEmailLogin } from "../../auth/authService";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [showInvalidEmailModal, setShowInvalidEmailModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { promptGoogleSignIn, isSigningIn, isDisabled } = useGoogleSignIn();
  const { sendLoginOtpCode } = useEmailLogin();

  const handleEmailSignIn = async () => {
    setErrorMessage("");

    if (!email.trim()) {
      setShowInvalidEmailModal(true);
      return;
    }

    try {
      const result = await sendLoginOtpCode(email.trim());

      if (!result) {
        setErrorMessage("Email not registered. Please sign up first.");
        return;
      }
      router.push({
        pathname: "/Registration/otpVerification",
        params: { email: email.trim(), isSignUp: "false" },
      });
    } catch (error) {
      console.error("Email Sign-In Error:", error);
      setErrorMessage("Email not registered. Please sign up first.");
    }
  };

  const handleSignUp = () => {
    router.push("/Registration/registration");
    console.log("Navigate to sign up");
  };

  const closeModal = () => {
    setShowInvalidEmailModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "flex-start",
    },

    // ===== Header =====
    header: {
      marginHorizontal: 16,
      marginBottom: 8,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerLogo: {
      width: 137,
      height: 40,
      resizeMode: "contain",
    },

    redContainer: {
      backgroundColor: "#941418",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },

    // ===== Illustration Section =====
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    illustration4: {
      width: 280,
      height: 280,
      resizeMode: "contain",
    },

    // ===== Sign In Section =====
    signInSection: {
      backgroundColor: "#941418",
      width: "100%",
      height: 440,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      paddingHorizontal: 33,
      // paddingBottom: 0,
      alignItems: "center",
    },

    textContainer: {
      width: 323,
      marginBottom: 16,
    },
    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 32,
      fontWeight: "bold",
      color: "#FFE2A3",
    },
    subtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#FFE2A3",
    },

    // ===== Google Button =====
    googleButtonContainer: {
      width: 323,
      // marginBottom: 20,
    },

    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      width: "100%",
      height: 50,
      // paddingVertical: 10
      borderRadius: 10,
    },

    googleIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
    },

    googleButtonText: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#1C1C1C",
      // fontWeight: "500",
    },

    // ===== Divider =====
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 16,
      opacity: 0.7,
      width: 323,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#FFE2A3",
    },

    dividerText: {
      color: "#FFE2A3",
      paddingHorizontal: 11,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
    },

    // ===== Inputs =====
    inputContainer: {
      width: "100%",
      marginBottom: 20,
    },

    label: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: "#ffffffff",
      marginBottom: 5, // increased a bit for spacing
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffffff",
      // borderColor: "#525252",
      borderWidth: 1,
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 16,
    },

    input: {
      flex: 1,
      fontFamily: "Poppins-Regular",
      fontSize: 15,
      color: "#1C1C1C",
      marginLeft: 10,
    },

    // ===== Sign In Button =====
    signInButton: {
      width: 323,
      height: 50,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#FFE2A3",
      borderRadius: 10,
      alignItems: "center",
      marginTop: 16,
      marginBottom: 24,
      // shadowColor: "#000",
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 4,
      // elevation: 4,
    },
    signInButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#941418",
    },

    // ===== Sign Up Link =====
    signUpContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      // marginTop: 24,
    },
    signUpText: {
      color: "#FFFFFF",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      opacity: 0.5,
    },
    signUpLink: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
    },
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.headerLogo}
                />
              </View>
            </View>

            {/* Illustration Section */}
            <View style={styles.illustrationContainer}>
              <Image
                source={require("../../assets/images/illustration4.png")}
                style={styles.illustration4}
                resizeMode="contain"
              />
            </View>

            {/* Main Content Card */}
            <SafeAreaView edges={["bottom"]} style={styles.redContainer}>
              <View style={styles.signInSection}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Get started with us</Text>
                  <Text style={styles.subtitle}>
                    Sign up now and start exploring our app. We're excited to
                    welcome you!
                  </Text>
                </View>

                {/* Google Sign In Button */}
                <View style={styles.googleButtonContainer}>
                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={promptGoogleSignIn}
                    activeOpacity={0.8}
                    disabled={isSigningIn || isDisabled} // Disable while loading
                  >
                    <Image
                      source={require("../../assets/images/google.png")}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>
                      {isSigningIn ? "Signing in..." : "Continue with Google"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email:</Text>
                  <View style={styles.inputWrapper}>
                    <Mail size={20} color={"#525252"} opacity={0.7} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email address"
                      placeholderTextColor="rgba(82, 82, 82, 0.7)"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setErrorMessage(""); // Clear error when typing
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleEmailSignIn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <TouchableOpacity
                  style={styles.signUpContainer}
                  onPress={handleSignUp}
                  activeOpacity={0.7}
                >
                  <Text style={styles.signUpText}>Don't have an account?</Text>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Invalid Email Modal */}
      <InvalidEmailModal visible={showInvalidEmailModal} onClose={closeModal} />
    </>
  );
}
