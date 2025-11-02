import React from "react";
import { Text, TextProps } from "react-native";

export default function CustomText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Poppins-Regular", color: "#000" }, // default font + color
        props.style,
      ]}
    />
  );
}
