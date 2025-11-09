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
  queueCard: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  queueContents: {
    width: 340,
    // justifyContent: "flex-end",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.3)",
    borderRadius: 20,
    padding: 35,
    // backgroundColor: "#000",

    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },

  illustration7: {
    width: "100%",
    height: 255,
    // backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 16,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    // alignContent: "center",
    marginBottom: 32,
    // backgroundColor: "#1a1a2e",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  textNumber: {
    fontFamily: "Poppins-Black",
    fontSize: 60,
    color: "#941418",
  },
  timerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // alignContent: "center",
    marginBottom: 32,
    // backgroundColor: "#1a1a2e",
  },
  textCaption: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
  },
  timer: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#525252",
  },

  //   Button Part

  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  reserveSeat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "rgba(82, 82, 82, 0.5)",
    borderRadius: 10,
    width: "100%",
    height: 50,
  },
  reserveSeatText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#ffffffff",
  },
  cancelQueue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(82, 82, 82, 0.3)",
    width: "100%",
    height: 50,
  },
  cancelQueueText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#rgba(28, 28, 28, 0.7)",
  },
});
