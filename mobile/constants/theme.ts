import { Platform } from "react-native";

export const Colors = {
  primary: "#941418",
  secondary: "#FFE2A3",
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#EFEFEF",
  textPrimary: "#1C1C1C",
  textSecondary: "#525252",
};

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
