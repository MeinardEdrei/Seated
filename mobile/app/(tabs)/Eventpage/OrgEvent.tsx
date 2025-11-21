import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CirclePlus } from "lucide-react-native";

import React from "react";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function OrgEvent() {
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push("/(tabs)/Eventpage/components/CreateEventForm");
  } 

  const EmptyState = () => (
    <View style={styles.emptyContent}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../../assets/images/illustration9.png")}
          style={styles.illustration9}
        />
      </View>

      <Text style={styles.title}>No events yet</Text>
      <Text style={styles.subtitle}>
        Time to get started! Tap the 'Create Event' button below to plan your
        event.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <CirclePlus size={20} color="#ffe2a3" strokeWidth={2.5} />
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {/* Header */}
        <Header />

        {/* Empty State UI */}
        <EmptyState />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },

  // ===== Empty State =====
  emptyContent: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 250,
    // marginHorizontal: 50,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
  },
  illustration9: {
    width: 200,
    height: 200,
    opacity: 1,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    textAlign: "center",
    marginBottom: 48,
  },

  button: {
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 10,
    width: 270,
    height: 50,
  },
  buttonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});
