import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import styles from "./RegistrationPageStyles";

export default function Registration() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  const handleEmailSignUp = () => {
    router.push("/Registration/emailRegistration");
  };

  const handleSignIn = () => {
    router.push("/Login/login");
    console.log("Navigate to Sign In");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/header-logo.png")}
                style={styles.headerLogo}
              />
            </View>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/images/illustration1.png")}
              style={styles.illustration1}
              resizeMode="contain"
            />
          </View>

          {/* Sign-up Section */}
          <SafeAreaView
            edges={["bottom"]}
            style={styles.redContainer}
          >
            <View style={styles.signUpSection}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Get started with us</Text>
                <Text style={styles.subtitle}>
                  Sign up now and start exploring our app. We're excited to
                  welcome you!
                </Text>
              </View>

              <View style={styles.buttonsSection}>
                <View style={styles.buttonsContainer}>
                  {/* Google Button */}
                  <View style={styles.googleButtonContainer}>
                    <TouchableOpacity
                      style={styles.googleButton}
                      onPress={handleGoogleSignUp}
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

                  {/* Email Button */}
                  <View style={styles.emailButtonContainer}>
                    <TouchableOpacity
                      style={styles.emailButton}
                      onPress={handleEmailSignUp}
                    >
                      <Image
                        source={require("../../assets/images/email.png")}
                        style={styles.googleIcon}
                      />
                      <Text style={styles.emailButtonText}>
                        Sign up with email
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Sign In link */}
                <TouchableOpacity
                  onPress={handleSignIn}
                  style={styles.signInContainer}
                >
                  <Text style={styles.signInText}>
                    Already have an account?{" "}
                  </Text>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </>
  );
}
