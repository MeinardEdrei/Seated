import React, { useEffect, useState } from "react";
import queueStyles from "../styles/queuingStyles";
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

const Queuing = () => {
  const router = useRouter();

  // ⏱️ Timer states
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [isRunning, setIsRunning] = useState(true);

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
    if (!isRunning) {
      alert("Seat reserved successfully!");
    }
  };

  const handleCancelQueue = () => {
    alert("Queue canceled!");
  };

  // Determine icon/text color based on timer
  const textAndIconColor = !isRunning ? "#FFE2A3" : "#FFFFFF";

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
                source={require("../../../../assets/images/illustration7.png")}
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
      </SafeAreaView>
    </>
  );
};

export default Queuing;

const styles = StyleSheet.create({});
