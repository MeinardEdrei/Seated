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
import { Settings } from "lucide-react-native";

import {
  Camera,
  Home,
  Calendar,
  MessageSquare,
  Bell,
  Upload,
} from "lucide-react-native";
import styles from "./styles/eventStyles";

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
  const handleSettings = () => {
    router.push("/(tabs)/Homepage/components/settings");
  };

  const handleViewEvent = () => {
    router.push("/Eventpage/components/viewEvent");
    // console.log("Navigate to sign up");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/header-logo.png")}
              style={styles.headerLogo}
            />
          </View>
          <TouchableOpacity onPress={handleSettings}>
            <Settings size={24} strokeWidth={2} color="#941418" />
            {/* <Menu color="#941418" /> */}
          </TouchableOpacity>
        </View>

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
