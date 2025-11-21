import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../../components/Header";

import StudentEvent from "./components/StudentEvent";
import { useAuth } from "@/context/AuthContext";
import OrgEvent from "./components/OrgEvent";

export default function EventPage() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Header />

        {role !== "organizer" ? <StudentEvent />
        : <OrgEvent />}

      </SafeAreaView>
    </>
  );
}
