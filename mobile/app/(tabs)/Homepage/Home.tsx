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
import OrgHome from "@/components/homepage/OrgHome";

const Home = () => {

  const { user } = useAuth();
  
  const role = user?.role?.toLowerCase();

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

        {role !== "organizer" ? (EventData.length > 1 ? <EventState EventData={EventData} /> : <EmptyState />) : <OrgHome />}  

      </SafeAreaView>
    </>
  );

};

export default Home;
