import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useGoogleSignIn } from "../../auth/authService";

export default function Registration() {
  const router = useRouter();
  const { promptGoogleSignIn, isSigningIn, isDisabled } = useGoogleSignIn();

  const handleEmailSignUp = () => {
    router.push("/Registration/emailRegistration");
  };

  const handleSignIn = () => {
    router.push("/Login/login");
    console.log("Navigate to Sign In");
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffffff",
    },
    contentContainer: {
      flex: 1, // instead of flexGrow
      justifyContent: "space-between",
    },
    header: {
      // paddingTop: 50,
      paddingBottom: 54,
      paddingLeft: 16,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerLogo: {
      width: 137,
      height: 40,
    },
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    illustration: {
      flex: 1,
      alignItems: "center",
    },
    illustration1: {
      width: 330,
      height: 330,
    },

    redContainer: {
      backgroundColor: "#941418",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },

    // ===== Sign Up Section =====
    signUpSection: {
      backgroundColor: "#941418",
      width: "auto",
      height: 340,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 24,
      paddingBottom: 24,
      alignItems: "center",
      paddingLeft: 33, // ✅ add margin on both sides
      paddingRight: 33,
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
      // marginBottom: 50,
    },

    buttonsSection: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },

    buttonsContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },

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

    emailButtonContainer: {
      width: 323,
      // marginTop: 20,
    },

    emailButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      width: "100%",
      height: 50,
      // paddingVertical: 24,
      borderRadius: 10,
    },

    emailIcon: {
      height: 20,
      width: 20,
      marginRight: 10,
    },

    emailButtonText: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#1C1C1C",
      // fontWeight: "500",
    },

    signInContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      // paddingBottom: 25,
    },

    signInText: {
      color: "#FFFFFF",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      opacity: 0.5,
    },

    signInLink: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      // fontWeight: "600",
    },
  });
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
          <SafeAreaView edges={["bottom"]} style={styles.redContainer}>
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
                      onPress={promptGoogleSignIn}
                      disabled={isDisabled || isSigningIn}
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
