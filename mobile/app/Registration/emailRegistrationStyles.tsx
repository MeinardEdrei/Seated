import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // centers vertically
    alignItems: "center", // centers horizontally
    paddingVertical: 20, // optional, adds breathing room on smaller screens
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

  content: {
    width: 340,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
    // lineHeight: 20,
    marginBottom: 33,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 32,
  },

  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#1C1C1C",
    marginBottom: 8, // increased a bit for spacing
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 10,
    height: 50, // fixed height for consistency
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#1C1C1C",
    marginLeft: 10,
  },

  inputErrorBorder: {
    borderColor: "#D91818",
  },

  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#D91818",
    marginTop: 5,
  },

  illustrationContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  illustration: {
    flex: 1,
    alignItems: "center",
  },
  illustration2: {
    width: 330,
    height: 330,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#941418",
    width: 340,
    height: 50,
    // paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: "#941418",
    opacity: 0.5,
  },

  buttonText: {
    fontFamily: "Poppins-Bold",
    color: "#FFE2A3",
    fontSize: 14,
  },
});