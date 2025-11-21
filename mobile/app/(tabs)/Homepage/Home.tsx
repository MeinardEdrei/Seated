import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Menu, Settings, Download, X } from "lucide-react-native";
import { BlurView } from "expo-blur";
import EmptyState from "./components/EmptyState"; 

import Header from "../../../components/Header";

const { width, height } = Dimensions.get("window");
import EventState from "./components/EventState";

const Home = () => {

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
        {EventData.length > 1 ? <EventState EventData={EventData} /> : <EmptyState /> }
      
      </SafeAreaView>
    </>
  );

};

export default Home;
