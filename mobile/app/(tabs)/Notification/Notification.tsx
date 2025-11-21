import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import StudentNotifications from "./components/StudentNotifications";
import OrgNotifications from "./components/OrgNotification";
import { useAuth } from "@/context/AuthContext";

const Notification = () => {
  const { user } = useAuth();

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
       
        {user?.role?.toLowerCase() !== "organizer" ? <StudentNotifications /> : <OrgNotifications />}

      </SafeAreaView>
    </>
  );
};

export default Notification;
