import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#941418",
    secondary: "#FFE2A3",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#EFEFEF",
    textPrimary: "#1C1C1C",
    textSecondary: "#525252",
  },
  dark: {
    primary: "#E74C3C",
    secondary: "#F1C40F",
    backgroundPrimary: "#121212",
    backgroundSecondary: "#1F1F1F",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
  },
};

export function useThemeColor(
  theme: "light" | "dark",
  colorName: keyof typeof Colors.light
) {
  return Colors[theme][colorName];
}


export const Fonts = Platform.select({
  ios: {
    regular: "Poppins-Regular",
    semiBold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
    extraBold: "Poppins-ExtraBold",
    black: "Poppins-Black",
  },
  android: {
    regular: "Poppins-Regular",
    semiBold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
    extraBold: "Poppins-ExtraBold",
    black: "Poppins-Black",
  },
  default: {
    regular: "Poppins-Regular",
    semiBold: "Poppins-SemiBold",
    bold: "Poppins-Bold",
    extraBold: "Poppins-ExtraBold",
    black: "Poppins-Black",
  },
  web: {
    regular: "'Poppins', sans-serif",
    semiBold: "'Poppins', sans-serif",
    bold: "'Poppins', sans-serif",
    extraBold: "'Poppins', sans-serif",
    black: "'Poppins', sans-serif",
  },
});
