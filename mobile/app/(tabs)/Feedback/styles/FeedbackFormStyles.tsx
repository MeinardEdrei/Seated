import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  overlayTouchable: {
    backgroundColor: "rgba(18, 18, 18, 0.75)", //ensures dark overlay is visible
  },
  blurOverlay: {
    flex: 1,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 340,
    maxHeight: "90%",
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  questionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1C1C1C",
    marginBottom: 16,
    // marginTop: 8,
    // paddingRight: 320,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 32,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(82, 82, 82, 0.1)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "#941418",
    borderColor: "#941418",
  },
  optionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  selectedOptionText: {
    color: "#FFE2A3",
  },
  // divider: {
  //   height: 1,
  //   backgroundColor: "#E0E0E0",
  //   marginVertical: 8,
  //   marginBottom: 24,
  // },
  submitButton: {
    backgroundColor: "#941418",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "rgba(110, 110, 110, 0.7)",
  },
  submitButtonTextDisabled: {
    color: "#FFFFFF", // white text when disabled
  },

  submitButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#FFE2A3",
  },
});
