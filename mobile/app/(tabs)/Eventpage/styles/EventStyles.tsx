import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
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

  mainContent: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 55,
    width: "100%",
    top: 70,
  },
  eventcontainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 55,
    width: 280,
  },

  caption: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#1C1C1C",
  },
  infoText: {
    color: "#525252",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "center",
    // paddingHorizontal: 32,
    marginBottom: 16,
  },
  scannerFrame: {
    width: 280,
    height: 280,
    backgroundColor: "rgba(82, 82, 82, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 32,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "#1C1C1C",
    borderWidth: 1,
  },
  topLeft: {
    borderTopLeftRadius: 10,
    top: 20,
    left: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    borderTopRightRadius: 10,
    top: 20,
    right: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    borderBottomLeftRadius: 10,
    bottom: 20,
    left: 20,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    borderBottomRightRadius: 10,
    bottom: 20,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  // ===== Divider =====
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
    opacity: 0.3,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#525252",
  },
  dividerText: {
    color: "#1C1C1C",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginHorizontal: 11,
  },
  photoButton: {
    backgroundColor: "#941418",
    // paddingHorizontal: 32,
    // paddingVertical: 12,
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    // Drop shadow from Figma settings
    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },
  photoButtonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },

  tempButton: {
    backgroundColor: "#151515ff",
    // paddingHorizontal: 32,
    // paddingVertical: 12,
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 50,

    // Drop shadow from Figma settings
    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },
  tempButtonText: {
    color: "#ffffffff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },

  // bottomNav: {
  //   backgroundColor: "#fff",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   paddingVertical: 8,
  //   borderTopWidth: 1,
  //   borderTopColor: "#E5E7EB",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: -2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 8,
  // },
  // navItem: {
  //   alignItems: "center",
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   gap: 4,
  // },
  // navItemActive: {
  //   backgroundColor: "#991B1B",
  //   borderRadius: 8,
  // },
  // navText: {
  //   fontSize: 12,
  //   fontWeight: "500",
  //   color: "#6B7280",
  // },
  // navTextActive: {
  //   color: "#991B1B",
  // },
  // navTextActiveWhite: {
  //   color: "#fff",
  // },
});
