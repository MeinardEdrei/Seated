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
    marginTop: 16,
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

  headerText: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#1C1C1C",
    // marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.7)",
  },
  activeTab: {
    backgroundColor: "#941418",
    borderColor: "#941418",
  },
  tabText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(82, 82, 82, 0.7)",
  },
  activeTabText: {
    color: "#FFE2A3",
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    marginHorizontal: 40,
    marginBottom: 20,
    // padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.2)",
    borderRadius: 20,
    overflow: "hidden",

    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    // padding: 25,
  },
  eventTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#1C1C1C",
    marginBottom: 5,
  },
  eventDetail: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "rgba(82, 82, 82, 0.8)",
  },
  statusBadge: {
    backgroundColor: "#525252",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  statusText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  feedbackButton: {
    backgroundColor: "#941418",
    height: 40,
    // paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackButtonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});
