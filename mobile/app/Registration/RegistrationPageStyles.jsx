import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    flex: 1, // instead of flexGrow
    justifyContent: "space-between",
  },
  header: {
    // paddingTop: 50,
    paddingBottom: 54,
    paddingLeft: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 137,
    height: 40,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
  },
  illustration: {
    flex: 1,
    alignItems: "center",
  },
  illustration1: {
    width: 330,
    height: 330,
  },

  // ===== Sign Up Section =====
  signUpSection: {
    backgroundColor: "#941418",
    width: "auto",
    height: 340,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    paddingLeft: 33, // ✅ add margin on both sides
    paddingRight: 33,
  },

  textContainer: {
    width: 323,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFE2A3",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFE2A3",
    // marginBottom: 50,
  },

  buttonsSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  googleButtonContainer: {
    width: 323,
    // marginBottom: 20,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    // paddingVertical: 10
    borderRadius: 50,
  },

  googleIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },

  googleButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
    // fontWeight: "500",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    opacity: 0.7,
    width: 323,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFE2A3",
  },

  dividerText: {
    color: "#FFE2A3",
    paddingHorizontal: 11,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },

  emailButtonContainer: {
    width: 323,
    // marginTop: 20,
  },

  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    // paddingVertical: 24,
    borderRadius: 50,
  },

  emailIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },

  emailButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
    // fontWeight: "500",
  },

  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    // paddingBottom: 25,
  },

  signInText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    opacity: 0.5,
  },

  signInLink: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    // fontWeight: "600",
  },
});
