import OrgNotifications from "@/components/notifications/OrgNotification";
import StudentNotifications from "@/components/notifications/StudentNotifications";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";

const Notification = () => {
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

        {role !== "organizer" ? <StudentNotifications /> : <OrgNotifications />}

      </SafeAreaView>
    </>
  );
};

export default Notification;
