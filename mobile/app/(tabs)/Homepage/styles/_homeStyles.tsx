import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingBottom: 100,
  },

  // ===== Header =====
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
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
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 32,
  },
  illustration5: {
    width: 280,
    height: 280,
    opacity: 0.3,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1C",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#941418",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 270,
    height: 50,
  },
  buttonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },

  // ===== Event Card State =====
  eventCard: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 340,
    height: 690,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.3)",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 35,

    // Drop shadow from Figma settings
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },

  eventHeader: {
    width: 270,
    // marginBottom: 16, // margin for my ticket text
    // paddingBottom: 20, // padding between more details and line
    // borderBottomWidth: 1,
    // borderBottomColor: "#F3F4F6",
  },
  eventTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#1C1C1C",
    // marginBottom: 8,
  },
  eventSeat: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#941418",
    marginBottom: 8,
  },
  eventDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    // marginBottom: 4,
  },
  eventTime: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(28, 28, 28, 0.8)",
    // marginBottom: 5,
  },
  moreDetails: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#941418",
    textDecorationLine: "underline",
  },
  // ===== Divider =====
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    opacity: 0.3,
    width: "100%",
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#525252",
  },

  ticketSection: {
    alignItems: "center",
    // marginBottom: 24,
  },
  ticketTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1C",
    // marginBottom: 4,
  },
  ticketSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    marginBottom: 8,
    textAlign: "center",
    // paddingHorizontal: 20,
  },
  // qrContainer: {
  //   backgroundColor: "#FFFFFF",
  //   padding: 16,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#E5E7EB",
  // },
  qrCode: {
    width: 270,
    height: 275,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  downloadButton: {
    backgroundColor: "#941418",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 270,
    height: 45,
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
    width: 270,
    height: 45,
    borderWidth: 1,
    opacity: 0.7,
    gap: 5,
  },
  cancelButtonText: {
    color: "#525252",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
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
  // title: {
  //   fontFamily: "Poppins-Bold",
  //   fontSize: 24,
  //   color: "#D91818",
  //   marginBottom: 8,
  //   textAlign: "center",
  // },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    width: 254,
    color: "#525252",
    textAlign: "center",
    marginBottom: 32,
  },

  // ===== Bottom Navigation =====
  // bottomNav: {
  //   flexDirection: "row",
  //   backgroundColor: "#FFFFFF",
  //   borderTopWidth: 1,
  //   borderTopColor: "#E5E7EB",
  //   paddingHorizontal: 24,
  //   paddingVertical: 12,
  //   justifyContent: "space-between",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: -2 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 4,
  //   elevation: 8,
  // },
  // navItem: {
  //   alignItems: "center",
  //   gap: 4,
  // },
  // navIconContainer: {
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // navIconActive: {
  //   width: 40,
  //   height: 40,
  //   backgroundColor: "#991B1B",
  //   borderRadius: 12,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // navIcon: {
  //   fontSize: 20,
  // },
  // navLabel: {
  //   fontSize: 11,
  //   color: "#6B7280",
  // },
  // navLabelActive: {
  //   fontSize: 11,
  //   fontWeight: "600",
  //   color: "#991B1B",
  // },
});
