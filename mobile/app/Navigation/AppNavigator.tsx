import React from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// ✅ Correct imports based on your folder structure
import Home from "../(tabs)/Homepage/home";
import Eventpage from "../(tabs)/Eventpage/event";
import Feedback from "../(tabs)/Feedback/feedback";
import NotificationPage from "../(tabs)/Notification/notification"; // renamed to avoid conflict

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <>
      {/* <View
        style={{
          backgroundColor: "#ffffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName: any;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Event") {
                iconName = "calendar";
              } else if (route.name === "Feedback") {
                iconName = "chatbubbles";
              } else if (route.name === "Notification") {
                iconName = "notifications";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#8B2E2E",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#fff",
              paddingBottom: 5,
              height: 60,
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Event" component={Eventpage} />
          <Tab.Screen name="Feedback" component={Feedback} />
          <Tab.Screen name="Notification" component={NotificationPage} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* </View> */}
    </>
  );
}
