import { Text } from "react-native";

export function setDefaultTextFont(fontName: string) {
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: fontName };
}
