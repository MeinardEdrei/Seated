import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Mail } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { auth } from "../../services/firebase";
import { User } from "firebase/auth";
import { getFirebaseIdToken, signInWithGoogle } from "../../auth/authService";

import styles from "../Styles/loginStyles";
import InvalidEmailModal from "./InvalidEmailModal";

import { googleLogin } from "../../api/auth";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalidEmailModal, setShowInvalidEmailModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user && !isSigningIn) {
        router.replace("/(tabs)/home");
      }
    });

    return () => unsubscribe();
  }, [isSigningIn]);

  const handleGoogleSignIn = async () => {
    console.log("Google sign-in button pressed!");
    try {
      setIsSigningIn(true);
      const result = await signInWithGoogle();
      const idToken = await getFirebaseIdToken();
      if (!idToken) {
        throw new Error("Failed to get Firebase ID token");
      } 

      const backendResponse = await googleLogin(idToken);
      console.log("Backend response:", backendResponse);
      // Navigation will be handled by onAuthStateChanged
      setIsSigningIn(false);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setIsSigningIn(false);
    }
  };

const handleEmailSignIn = () => {
  if (!email.trim()) {
    setShowInvalidEmailModal(true);
    return;
  }

  router.push("/(tabs)/home");
};

  const checkEmailExists = async (email: string): Promise<boolean> => {
    return false; 
  };

  const handleSignUp = () => {
    router.push("/Registration/registration");
    console.log("Navigate to sign up");
  };


  const closeModal = () => {
    setShowInvalidEmailModal(false);
  };

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
            <SafeAreaView
              edges={["bottom"]}
              style={styles.redContainer}
            >
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
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require("../../assets/images/google.png")}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>
                      Sign up with Google
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
                      onChangeText={setEmail}
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
                  <Text style={styles.signUpLink}>Sign up</Text>
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
