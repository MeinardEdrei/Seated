import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 14,
  },

  headerTop: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // paddingBottom: 14,
  },

  backButton: {
    position: "absolute",
    left: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#941418",
    textAlign: "center",
  },

  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#525252",
    opacity: 0.5,
    marginTop: 14,
    marginBottom: 25,
  },

  scrollView: {
    flex: 1,
  },
  eventCard: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginHorizontal: 28,
  },
  eventContents: {
    width: 335,
    // justifyContent: "flex-end",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.3)",
    borderRadius: 20,

    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },

  eventImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    backgroundColor: "#EFEFEF",
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  eventTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#941418",
  },
  infoSection: {
    flexDirection: "row",
    // marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    // fontWeight: "600",
    color: "rgba(28, 28, 28, 0.8)",
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    flex: 1,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 32,
  },
  descriptionLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    // fontWeight: "600",
    color: "rgba(28, 28, 28, 0.8)",
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(28, 28, 28, 0.8)",
  },

  queueButton: {
    backgroundColor: "#941418",
    width: "100%",
    height: 50,
    // paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  queueButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFE2A3",
  },
});
