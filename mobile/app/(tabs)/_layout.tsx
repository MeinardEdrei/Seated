import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, Dimensions } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function TabsLayout() {
  const { width } = Dimensions.get("window");
  const horizontalMargin = width * 0.06;
  const bottomMargin = Platform.OS === "ios" ? 20 : 15;
  const { user } = useAuth();

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#941418",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          position: "absolute",
          bottom: bottomMargin,
          marginLeft: horizontalMargin,
          marginRight: horizontalMargin,
          backgroundColor: "#ffffff",
          borderRadius: 30,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
          elevation: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
          />
        ),
        tabBarItemStyle: {
          marginTop: 5,
          paddingVertical: 5,
          paddingHorizontal: 2,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
          fontSize: 12,
          marginTop: -5,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="Homepage/Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={focused ? "#941418" : color}
              size={24}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
            fontSize: 12,
            color: "#941418",
            marginTop: -5,
          },
        }}
      />

      {/* Hidden Files in Homepage */}
      <Tabs.Screen name="Homepage/styles/HomeStyles" options={{ href: null }} />
      <Tabs.Screen
        name="Homepage/components/Settings"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Homepage/styles/EventDetailsModalStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Homepage/components/EventDetailsModal"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Homepage/components/CancelReservationModal"
        options={{ href: null }}
      />

      {/* Event */}
      <Tabs.Screen
        name="Eventpage/Event"
        options={{
          title: "Event",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Hidden Files in Eventpage */}
      <Tabs.Screen
        name="Eventpage/styles/EventStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Eventpage/components/ViewEvent"
        options={{ href: null }}
      />
      <Tabs.Screen name="Eventpage/Queuing" options={{ href: null }} />
      <Tabs.Screen name="Eventpage/SeatMapView" options={{ href: null }} />
      <Tabs.Screen
        name="Eventpage/components/CancelQueueModal"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Eventpage/styles/ViewEventStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Eventpage/styles/QueuingStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Eventpage/styles/CancelQueueModalStyles"
        options={{ href: null }}
      />

      {/* Scanner - Only for Organizers */}
      <Tabs.Screen
        name="Scanner/Scanner"
        options={{
          href: isOrganizer ? undefined : null,
          title: "Scanner",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "scan" : "scan-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Feedback - Only for non-Organizers */}
      <Tabs.Screen
        name="Feedback/Feedback"
        options={{
          href: !isOrganizer ? undefined : null,
          title: "Feedback",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Hidden Files in Feedback */}
      <Tabs.Screen
        name="Feedback/styles/FeedbackStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Feedback/styles/FeedbackFormStyles"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="Feedback/components/FeedbackForm"
        options={{ href: null }}
      />

      {/* Notification */}
      <Tabs.Screen
        name="Notification/Notification"
        options={{
          title: "Notification",
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
  );
}
