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
  // ===== Header =====
  header: {
    marginLeft: 16,
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

  // ===== Illustration Section =====
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
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  navIconActive: {
    width: 40,
    height: 40,
    backgroundColor: "#991B1B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: "600",
    color: "#991B1B",
  },
});
