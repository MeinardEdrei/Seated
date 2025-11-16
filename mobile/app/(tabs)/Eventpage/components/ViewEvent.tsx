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
import viewEventstyles from "../styles/ViewEventStyles";

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
    router.push("/Eventpage/Queuing");
    // console.log("Entering queue...");
  };

  const handleBack = () => {
    router.back(); // ✅ replaces navigation.goBack()
  };

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
