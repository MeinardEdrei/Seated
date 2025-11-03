import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(28, 28, 28, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  blurOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Add fallback semi-transparent color if blur isn't supported
    backgroundColor: "rgba(28, 28, 28, 0.75)",
  },

  modalContainer: {
    width: 290,
    height: 265,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    // padding: 24,
    // shadowColor: "#ff0000ff",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 8,
  },
  errorCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#D91818",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#D91818",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    width: 254,
    color: "#525252",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#941418",
    borderRadius: 5,
    width: 116,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
});