import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function EmptyState() {

  const router = useRouter();

  const handleJoinEvent = () => {
    router.push("/(tabs)/Eventpage/Event");
  };
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginBottom: 32,
    },
    illustration5: {
      width: 280,
      height: 280,
      opacity: 0.3,
      resizeMode: "contain",
    },
    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      fontWeight: "bold",
      color: "#1C1C1C",
      textAlign: "center",
    },
    subtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
      marginBottom: 32,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#941418",
      alignItems: "center",
      justifyContent: "center",
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
  return (
    <View style={styles.content}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/illustration5.png")}
          style={styles.illustration5}
        />
      </View>

      <Text style={styles.title}>Empty seat reservation</Text>
      <Text style={styles.subtitle}>You have not join events yet.</Text>

      <TouchableOpacity style={styles.button} onPress={handleJoinEvent}>
        <Text style={styles.buttonText}>Join Event Now!</Text>
      </TouchableOpacity>
    </View>
  );
}
