import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";

export default function StudentNotifications() {
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    // ===== Header =====
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 16,
      marginBottom: 8,
      marginTop: 16,
      // backgroundColor: "#47fc00ff",
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerLogo: {
      width: 137,
      height: 40,
      resizeMode: "contain",
    },

    // ===== Empty State =====
    emptyContent: {
      flex: 1,
      alignSelf: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: 280,
      // marginHorizontal: 50,
    },
    illustrationContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginBottom: 32,
    },
    illustration8: {
      width: 200,
      height: 200,
      opacity: 0.5,
      resizeMode: "contain",
    },
    title: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      color: "#1C1C1C",
      textAlign: "center",
    },
    subtitle: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#525252",
      textAlign: "center",
    },
  });
  return (
    <View style={styles.emptyContent}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/illustration8.png")}
          style={styles.illustration8}
        />
      </View>

      <Text style={styles.title}>No notifications yet</Text>
      <Text style={styles.subtitle}>
        You have no notifications right now. Come back later
      </Text>
    </View>
  );
}
