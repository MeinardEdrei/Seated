import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";

import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewEvent: React.FC = () => {
  const router = useRouter(); // ✅ replaces navigation prop

  const eventData = {
    title: "CCIS: General Meeting",
    venue: "UMak Performing Arts Theater",
    date: "October 25, 2025",
    time: "01:00 PM - 04:30 PM",
    image: require("../../../../assets/images/eventImage1.jpg"), // ✅ fixed line
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
  };

  const handleEnterQueue = () => {
    router.push("/Eventpage/components/Queuing");
    // console.log("Entering queue...");
  };

  const handleBack = () => {
    router.back(); // ✅ replaces navigation.goBack()
  };

const viewEventstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 14,
  },

  headerTop: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // paddingBottom: 14,
  },

  backButton: {
    position: "absolute",
    left: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#941418",
    textAlign: "center",
  },

  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#525252",
    opacity: 0.5,
    marginTop: 14,
    marginBottom: 25,
  },

  scrollView: {
    flex: 1,
  },
  eventCard: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginHorizontal: 28,
  },
  eventContents: {
    width: 340,
    // justifyContent: "flex-end",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.3)",
    borderRadius: 20,

    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },

  eventImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    backgroundColor: "#EFEFEF",
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  eventTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#941418",
  },
  infoSection: {
    flexDirection: "row",
    // marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    // fontWeight: "600",
    color: "rgba(28, 28, 28, 0.8)",
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    flex: 1,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 32,
  },
  descriptionLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    // fontWeight: "600",
    color: "rgba(28, 28, 28, 0.8)",
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(28, 28, 28, 0.8)",
  },

  queueButton: {
    backgroundColor: "#941418",
    width: "100%",
    height: 50,
    // paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  queueButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFE2A3",
  },
});
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={viewEventstyles.container}
        edges={["top", "left", "right"]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={viewEventstyles.header}>
          <View style={viewEventstyles.headerTop}>
            <TouchableOpacity
              style={viewEventstyles.backButton}
              onPress={handleBack}
            >
              <ChevronLeft size={24} color="#941418" />
            </TouchableOpacity>
            <Text style={viewEventstyles.headerTitle}>View Event</Text>
          </View>
          <View style={viewEventstyles.dividerLine} />
        </View>

        <ScrollView
          style={viewEventstyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Event Card */}
          <View style={viewEventstyles.eventCard}>
            <View style={viewEventstyles.eventContents}>
              {/* Event Image */}
              <Image
                source={require("../../../../assets/images/eventImage1.jpg")}
                style={viewEventstyles.eventImage}
                resizeMode="cover"
              />

              {/* Event Details Section */}
              <View style={viewEventstyles.detailsContainer}>
                <Text style={viewEventstyles.eventTitle}>
                  {eventData.title}
                </Text>

                <View style={viewEventstyles.infoSection}>
                  <Text style={viewEventstyles.infoLabel}>Venue: </Text>
                  <Text style={viewEventstyles.infoText}>
                    {eventData.venue}
                  </Text>
                </View>

                <View style={viewEventstyles.infoSection}>
                  <Text style={viewEventstyles.infoLabel}>Date: </Text>
                  <Text style={viewEventstyles.infoText}>{eventData.date}</Text>
                </View>

                <View style={viewEventstyles.infoSection}>
                  <Text style={viewEventstyles.infoLabel}>Time: </Text>
                  <Text style={viewEventstyles.infoText}>{eventData.time}</Text>
                </View>
                <View style={viewEventstyles.description}>
                  <Text style={viewEventstyles.descriptionLabel}>
                    Description:
                  </Text>
                  <Text style={viewEventstyles.descriptionText}>
                    {eventData.description}
                  </Text>
                </View>

                {/* Enter Queue Button */}
                <TouchableOpacity
                  style={viewEventstyles.queueButton}
                  onPress={handleEnterQueue}
                  activeOpacity={0.8}
                >
                  <Text style={viewEventstyles.queueButtonText}>
                    Enter Queue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ViewEvent;
