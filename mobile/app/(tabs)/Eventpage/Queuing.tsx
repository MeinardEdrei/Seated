import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeft, X } from "lucide-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CancelQueueModal from "./components/CancelQueueModal"; // Import the modal

const Queuing = () => {
  const router = useRouter();

  // ⏱️ Timer states
  const [timeLeft, setTimeLeft] = useState(0); // 2 minutes = 120 seconds
  const [isRunning, setIsRunning] = useState(true);

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Convert seconds → mm:ss format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleBack = () => {
    router.back();
  };

  const handleReserveSeat = () => {

  };

  const handleCancelQueue = () => {
    setShowCancelModal(true); // Show the modal instead of alert
  };

  const handleModalCancel = () => {
    setShowCancelModal(false); // Just close the modal
  };

  const handleModalConfirm = () => {
    setShowCancelModal(false);
    // Add your queue cancellation logic here
    router.back(); // or navigate to another screen
  };

  // Determine icon/text color based on timer
  const textAndIconColor = !isRunning ? "#FFE2A3" : "#FFFFFF";

  const queueStyles = StyleSheet.create({
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
    queueCard: {
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    queueContents: {
      width: 340,
      // justifyContent: "flex-end",
      // alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.3)",
      borderRadius: 20,
      padding: 35,
      // backgroundColor: "#000",

      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2, // 20% opacity
      shadowRadius: 4, // corresponds to blur 4
      elevation: 2, // Android shadow
    },

    illustration7: {
      width: "100%",
      height: 255,
      // backgroundColor: "#1a1a2e",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginBottom: 16,
    },
    textContainer: {
      width: "100%",
      alignItems: "center",
      // alignContent: "center",
      marginBottom: 32,
      // backgroundColor: "#1a1a2e",
    },
    text: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#1C1C1C",
    },
    textNumber: {
      fontFamily: "Poppins-Black",
      fontSize: 60,
      color: "#941418",
    },
    timerContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // alignContent: "center",
      marginBottom: 32,
      // backgroundColor: "#1a1a2e",
    },
    textCaption: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
    },
    timer: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
    },

    //   Button Part

    buttonContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    reserveSeat: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      backgroundColor: "rgba(82, 82, 82, 0.5)",
      borderRadius: 10,
      width: "100%",
      height: 50,
    },
    reserveSeatText: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "#ffffffff",
    },
    cancelQueue: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "rgba(82, 82, 82, 0.3)",
      width: "100%",
      height: 50,
    },
    cancelQueueText: {
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      color: "#rgba(28, 28, 28, 0.7)",
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView
        style={queueStyles.container}
        edges={["top", "left", "right"]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={queueStyles.header}>
          <View style={queueStyles.headerTop}>
            <TouchableOpacity
              style={queueStyles.backButton}
              onPress={handleBack}
            >
              <ChevronLeft size={24} color="#941418" />
            </TouchableOpacity>
            <Text style={queueStyles.headerTitle}>Queuing</Text>
          </View>
          <View style={queueStyles.dividerLine} />
        </View>

        <ScrollView
          style={queueStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={queueStyles.queueCard}>
            <View style={queueStyles.queueContents}>
              {/* Event Image */}
              <Image
                source={require("@/assets/images/illustration7.png")}
                style={queueStyles.illustration7}
                resizeMode="cover"
              />

              {/* Queue info */}
              <View style={queueStyles.textContainer}>
                <Text style={queueStyles.text}>You are currently number</Text>
                <Text style={queueStyles.textNumber}>10</Text>
                <Text style={queueStyles.text}>in line</Text>
              </View>

              {/* Timer */}
              <View style={queueStyles.timerContainer}>
                <Text style={queueStyles.textCaption}>
                  Estimated wait time:{" "}
                </Text>
                <Text style={queueStyles.timer}>
                  {isRunning ? formatTime(timeLeft) : "Go Reserve!"}
                </Text>
              </View>

              {/* Buttons */}
              <View style={queueStyles.buttonContainer}>
                {/* Reserve Seat Button */}
                <TouchableOpacity
                  style={[
                    queueStyles.reserveSeat,
                    {
                      backgroundColor: isRunning
                        ? "rgba(82,82,82,0.5)"
                        : "#941418",
                    },
                  ]}
                  disabled={isRunning}
                  onPress={handleReserveSeat}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="event-seat"
                    color={textAndIconColor}
                    size={20}
                  />
                  <Text
                    style={[
                      queueStyles.reserveSeatText,
                      { color: textAndIconColor },
                    ]}
                  >
                    Reserve Seat
                  </Text>
                </TouchableOpacity>

                {/* Cancel Queue Button */}
                <TouchableOpacity
                  style={queueStyles.cancelQueue}
                  onPress={handleCancelQueue}
                  activeOpacity={0.8}
                >
                  <X size={20} strokeWidth={2} color="rgba(28, 28, 28, 0.7)" />
                  <Text style={queueStyles.cancelQueueText}>Cancel Queue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Cancel Queue Modal */}
        <CancelQueueModal
          visible={showCancelModal}
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      </SafeAreaView>
    </>
  );
};

export default Queuing;

const styles = StyleSheet.create({});
