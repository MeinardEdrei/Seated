import EmptyState from "@/components/homepage/EmptyState";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EventState from "@/components/homepage/EventState";
import { useAuth } from "@/context/AuthContext";
import Header from "../../../components/Header";
const Home = () => {

  const { user } = useAuth();

  const [EventData, setEventData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    }
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <Header />

        {/* Conditional Content Rendering */}

        {EventData.length > 1 ? <EventState EventData={EventData} /> : <EmptyState />}

      </SafeAreaView>
    </>
  );

};

export default Home;
