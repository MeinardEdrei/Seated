import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../../components/Header";

import OrgEvent from "@/components/eventpage/OrgEvent";
import StudentEvent from "@/components/eventpage/StudentEvent";
import { useAuth } from "@/context/AuthContext";

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

        {role !== "Organizer" ? <StudentEvent />
          : <OrgEvent />}

      </SafeAreaView>
    </>
  );
}
