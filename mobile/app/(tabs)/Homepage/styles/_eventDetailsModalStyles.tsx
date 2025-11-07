// Modal Styles
import { StyleSheet, Dimensions } from "react-native";

// Get screen width & height
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  blurOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Add fallback semi-transparent color if blur isn't supported
    backgroundColor: "rgba(28, 28, 28, 0.75)",
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    // width: width * 0.9,
    width: "100%",
    // width: "100%",
    maxHeight: height * 0.73,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    opacity: 0.5,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // borderRadius: 20,
    // padding: 8,
  },
  eventImage: {
    width: "100%",
    height: 190,
  },
  contentContainer: {
    padding: 35,
  },
  eventTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#000000",
  },
  seatNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#941418",
    marginBottom: 8,
  },
  details: {
    // flexDirection: "row",
    marginBottom: 0,
  },
  detailContents: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    // width: 60,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(82, 82, 82, 0.3)",
    marginVertical: 16,
  },
  descriptionLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    // marginBottom: 8,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(28, 28, 28, 0.8)",
    // lineHeight: 20,
  },
  ticketTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1C1C1C",
    textAlign: "center",
  },
  ticketSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    textAlign: "center",
    marginBottom: 8,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  qrCode: {
    width: 200,
    height: 203,
  },
  buttonContainer: {
    gap: 12,
  },
  downloadButton: {
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: 50,
    gap: 5,
  },
  downloadButtonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#EFEFEF",
    borderColor: "rgba(82, 82, 82, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    opacity: 0.7,
    gap: 5,
  },
  cancelButtonText: {
    color: "#525252",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});
