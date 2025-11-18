import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../../components/Header";
import {
  Camera,
  Home,
  Calendar,
  MessageSquare,
  Bell,
  Upload,
} from "lucide-react-native";

interface ScanResult {
  success: boolean;
  name?: string;
  table?: string;
  guests?: number;
  message?: string;
}

export default function EventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("event");

  const handleViewEvent = () => {
    router.push("/Eventpage/components/ViewEvent");
    // console.log("Navigate to sign up");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffffff",
    },

    mainContent: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      // paddingHorizontal: 55,
      width: "100%",
      top: 70,
    },
    eventcontainer: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      // paddingHorizontal: 55,
      width: 280,
    },

    caption: {
      fontFamily: "Poppins-Semibold",
      fontSize: 16,
      color: "#1C1C1C",
    },
    infoText: {
      color: "#525252",
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      textAlign: "center",
      // paddingHorizontal: 32,
      marginBottom: 16,
    },
    scannerFrame: {
      width: 280,
      height: 280,
      backgroundColor: "rgba(82, 82, 82, 0.2)",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      // marginBottom: 32,
      position: "relative",
    },
    corner: {
      position: "absolute",
      width: 28,
      height: 28,
      borderColor: "#1C1C1C",
      borderWidth: 1,
    },
    topLeft: {
      borderTopLeftRadius: 10,
      top: 20,
      left: 20,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    topRight: {
      borderTopRightRadius: 10,
      top: 20,
      right: 20,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    bottomLeft: {
      borderBottomLeftRadius: 10,
      bottom: 20,
      left: 20,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    bottomRight: {
      borderBottomRightRadius: 10,
      bottom: 20,
      right: 20,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    // ===== Divider =====
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 32,
      opacity: 0.3,
      width: "100%",
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#525252",
    },
    dividerText: {
      color: "#1C1C1C",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginHorizontal: 11,
    },
    photoButton: {
      backgroundColor: "#941418",
      // paddingHorizontal: 32,
      // paddingVertical: 12,
      width: "100%",
      height: 50,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,

      // Drop shadow from Figma settings
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1, // 20% opacity
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },
    photoButtonText: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },

    tempButton: {
      backgroundColor: "#151515ff",
      // paddingHorizontal: 32,
      // paddingVertical: 12,
      width: "100%",
      height: 50,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 50,

      // Drop shadow from Figma settings
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1, // 20% opacity
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },
    tempButtonText: {
      color: "#ffffffff",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },

    // bottomNav: {
    //   backgroundColor: "#fff",
    //   flexDirection: "row",
    //   justifyContent: "space-around",
    //   alignItems: "center",
    //   paddingVertical: 8,
    //   borderTopWidth: 1,
    //   borderTopColor: "#E5E7EB",
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: -2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 4,
    //   elevation: 8,
    // },
    // navItem: {
    //   alignItems: "center",
    //   paddingVertical: 8,
    //   paddingHorizontal: 16,
    //   gap: 4,
    // },
    // navItemActive: {
    //   backgroundColor: "#991B1B",
    //   borderRadius: 8,
    // },
    // navText: {
    //   fontSize: 12,
    //   fontWeight: "500",
    //   color: "#6B7280",
    // },
    // navTextActive: {
    //   color: "#991B1B",
    // },
    // navTextActiveWhite: {
    //   color: "#fff",
    // },
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.eventcontainer}>
            <Text style={styles.caption}>Find a code to scan</Text>
            {/* Info Text */}
            <Text style={styles.infoText}>
              Position the QR code within the frame to scan
            </Text>

            {/* Scanner Frame */}
            <TouchableOpacity style={styles.scannerFrame} activeOpacity={0.8}>
              {/* Corner Brackets */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Camera Icon */}
              {/* <Camera size={48} color="#9CA3AF" /> */}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Scan from Photo Button */}
            <TouchableOpacity style={styles.photoButton} activeOpacity={0.8}>
              <Upload size={20} strokeWidth={2.5} color="#FFE2A3" />
              <Text style={styles.photoButtonText}>Upload QR Code</Text>
            </TouchableOpacity>

            {/* Temporary Button to proceed to next page*/}
            <TouchableOpacity
              style={styles.tempButton}
              onPress={handleViewEvent}
              activeOpacity={0.8}
            >
              {/* <Upload size={20} strokeWidth={2.5} color="#FFE2A3" /> */}
              <Text style={styles.tempButtonText}>Next Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
