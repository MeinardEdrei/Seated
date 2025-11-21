import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ChevronLeft, X } from "lucide-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CancelQueueModal from "./components/CancelQueueModal";

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
    if (!isRunning) router.push("/Eventpage/SeatMapView");
  };
  const handleCancelQueue = () => {
    setShowCancelModal(true);
  };
  const handleModalCancel = () => {
    setShowCancelModal(false);
  };
  const handleModalConfirm = () => {
    setShowCancelModal(false);
    router.back();
  };

  const textAndIconColor = !isRunning ? "#FFE2A3" : "#FFFFFF";

  const bottomPadding = Platform.OS === "ios" ? 110 : 90;

  const queueStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTop: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    backButton: {
      position: "absolute",
      left: 16,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
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
      marginBottom: 10,
    },

    mainContent: {
      flex: 1,
      width: "100%",
      paddingBottom: bottomPadding,
      justifyContent: "center",
      alignItems: "center",
    },

    queueContents: {
      width: "90%",
      borderWidth: 1,
      borderColor: "rgba(82, 82, 82, 0.3)",
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#fff",
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    illustration7: {
      width: "100%",
      height: 270,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginBottom: 16,
      resizeMode: "cover",
    },
    textContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 20,
    },
    text: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#1C1C1C",
    },
    textNumber: {
      fontFamily: "Poppins-Black",
      fontSize: 50,
      color: "#941418",
    },
    timerContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
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
      color: "rgba(28, 28, 28, 0.7)",
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

        <View style={queueStyles.mainContent}>
          <View style={queueStyles.queueContents}>
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
              <Text style={queueStyles.textCaption}>Estimated wait time: </Text>
              <Text style={queueStyles.timer}>
                {isRunning ? formatTime(timeLeft) : "Go Reserve!"}
              </Text>
            </View>

            {/* Buttons */}
            <View style={queueStyles.buttonContainer}>
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
