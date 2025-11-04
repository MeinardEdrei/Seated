import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },

  innerContainer: {
    flex: 1,
    justifyContent: "space-between", // pushes bottom button to end
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
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  contentInner: {
    width: 340,
    alignItems: "center",
  },

  description: {
    // textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
    marginBottom: 18,
  },
  otpContainer: {
    flexDirection: "row",
    gap: 16,
    width: 320,
    marginBottom: 12,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#525252",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#941418",
  },
  resendButton: {
    alignSelf: "flex-end",
    padding: 0,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#941418",
  },
  resendTextDisabled: {
    color: "#941418",
  },
  illustrationContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 99,
  },
  illustration: {
    flex: 1,
    alignItems: "center",
  },
  illustration3: {
    width: 330,
    height: 380,
    resizeMode: "stretch",
  },
  bottomButtonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  signUpButton: {
    backgroundColor: "#941418",
    width: 340,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#941418",
    opacity: 0.5,
  },

  signUpButtonText: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});
