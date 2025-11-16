import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings } from "lucide-react-native";
import styles from "./styles/NotificationStyles";
const Notification = () => {
  const router = useRouter();
  const handleSettings = () => {
    router.push("/(tabs)/Homepage/components/Settings");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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

        <View style={styles.emptyContent}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../../assets/images/illustration8.png")}
              style={styles.illustration8}
            />
          </View>

          <Text style={styles.title}>No notifications yet</Text>
          <Text style={styles.subtitle}>
            You have no notifications right now. Come back later
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notification;
