import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";

interface HeaderProps {
  showSettings?: boolean;
  onSettingsPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  showSettings = true,
  onSettingsPress 
}) => {
  const router = useRouter();

  const handleSettings = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      router.push("/Utils/Settings");
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/header-logo.png")}
          style={styles.headerLogo}
        />
      </View>
      {showSettings && (
        <TouchableOpacity onPress={handleSettings}>
          <Settings size={24} strokeWidth={2} color="#941418" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
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
});

export default Header;
