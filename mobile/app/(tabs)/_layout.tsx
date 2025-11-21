// NAVBAR FOR USER ONLY

import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  const { user } = useAuth();

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  console.log("Role:", user?.role)

  return (
    <View
      style={{
        backgroundColor: "#ffffffff",
        flex: 1,
      }}
    >
      <Tabs
        // initialRouteName={isOrganizer ? "Homepage/OrgHome" : "Homepage/Home"}
        // initialRouteName={
        //   isOrganizer ? "Eventpage/OrgEvent" : "Eventpage/Event"
        // }
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#941418",
          tabBarInactiveTintColor: "#525252",
          tabBarStyle: {
            bottom: 16,
            justifyContent: "center",
            alignSelf: "center",
            width: 358,
            backgroundColor: "#ffffffff",
            borderRadius: 20,
            height: 74,
            paddingHorizontal: 10,
            paddingBottom: 8,
            paddingTop: 8,
            borderWidth: 1,
            borderColor: "rgba(82, 82, 82, 0.2)",
            shadowColor: "#1C1C1C",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 15,
          },
          tabBarItemStyle: {
            width: "50%",
            paddingVertical: 0,
          },
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
            fontSize: 12,
            marginTop: 0,
          },
        }}
      >
        {/* Home - for both students and organizers */}
        <Tabs.Screen
          name="Homepage/Home"
          options={{
            title: "Home",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#941418" : color}
                size={24}
              />
            ),
          }}
        />

        {/* Event - for both students and organizers */}
        <Tabs.Screen
          name="Eventpage/Event"
          options={{
            title: "Event",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />


        {/* Feedback - ONLY for students/guests, hidden for organizers */}
        <Tabs.Screen
          name="Feedback/Feedback"
          options={{
            href: isOrganizer ? null : undefined,
            title: "Feedback",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />



        {/* Scanner - ONLY for organizers, hidden for students/guests */}
        <Tabs.Screen
          name="Scanner/Scanner"
          options={{
            href: isOrganizer ? undefined : null,
            title: "Scanner",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "scan" : "scan-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />

        {/* Notification - for both students and organizers */}
        <Tabs.Screen
          name="Notification/Notification"
          options={{
            title: "Notification",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />

      </Tabs>
    </View>
  );
}
