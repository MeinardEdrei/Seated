export default ({ config }) => ({
  ...config,
  name: "Seated",
  slug: "mobile",
  owner: "samjoshuadud",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon-logo.png",
  scheme: "mobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    API_URL: process.env.API_URL,
    EXPO_USERNAME: process.env.EXPO_USERNAME,
    eas: {
      projectId: "8711db8e-b932-464b-827b-888c31943f30",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-font",
    "@react-native-google-signin/google-signin",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});

