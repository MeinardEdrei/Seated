import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import styles from "./homeStyles";

export default function Home() {
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
        </View>

        <View style={styles.content}>
          {/* Empty State Icon */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../../assets/images/illustration5.png")}
              style={styles.illustration5}
            />
          </View>

          {/* Empty State Text */}
          <Text style={styles.title}>Empty seat reservation</Text>
          <Text style={styles.subtitle}>You have not join events yet.</Text>

          {/* Join Event Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Join Event Now!</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconActive}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
            <Text style={styles.navLabelActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
            <Text style={styles.navLabel}>Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>💬</Text>
            </View>
            <Text style={styles.navLabel}>Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>🔔</Text>
            </View>
            <Text style={styles.navLabel}>Notification</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
