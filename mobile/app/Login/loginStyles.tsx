import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
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

  redContainer:{
    backgroundColor: "#941418",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // ===== Illustration Section =====
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24, // ✅ removes the white gap
  },
  illustration4: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },

  // ===== Sign In Section =====
  signInSection: {
    backgroundColor: "#941418",
    width: "100%",
    height: 440,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 33,
    // paddingBottom: 0,
    alignItems: "center",
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
  },

  // ===== Google Button =====
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
    borderRadius: 10,
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

  // ===== Divider =====
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

  // ===== Inputs =====
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#ffffffff",
    marginBottom: 5, // increased a bit for spacing
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    // borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#1C1C1C",
    marginLeft: 10,
  },

  // ===== Sign In Button =====
  signInButton: {
    width: 323,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFE2A3",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#941418",
  },

  // ===== Sign Up Link =====
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    // marginTop: 24,
  },
  signUpText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    opacity: 0.5,
  },
  signUpLink: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
});
