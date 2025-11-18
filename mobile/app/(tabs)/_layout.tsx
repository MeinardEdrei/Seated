import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, Dimensions } from "react-native";

export default function TabsLayout() {
  const { width } = Dimensions.get("window");
  const horizontalMargin = width * 0.06; // 6% of screen width for responsive spacing
  const bottomMargin = Platform.OS === "ios" ? 20 : 10;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#941418",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          position: "absolute", // Make it float
          bottom: bottomMargin, // Distance from bottom
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
              backgroundColor: "transparent", // Transparent background
            }}
          />
        ),
        tabBarItemStyle: {
          marginTop: 5,
          paddingVertical: 5,
          paddingHorizontal: 2, // More spacing between items
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
            <View
            //   style={{
            //     backgroundColor: focused ? "#941418" : "transparent",
            //     borderRadius: 15,
            //     paddingHorizontal: 20,
            //     paddingVertical: 8,
            //     minWidth: 80,
            //     alignItems: "center",
            //   }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#941418" : color}
                size={24}
              />
            </View>
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
      <Tabs.Screen
        name="Homepage/styles/HomeStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Homepage/components/Settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Homepage/styles/EventDetailsModalStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Homepage/components/EventDetailsModal"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Homepage/components/CancelReservationModal"
        options={{
          href: null,
        }}
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
      {/* Hidden Files in Homepage */}
      <Tabs.Screen
        name="Eventpage/styles/EventStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/components/ViewEvent"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/Queuing"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/SeatMapView"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/components/CancelQueueModal"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/styles/ViewEventStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/styles/QueuingStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Eventpage/styles/CancelQueueModalStyles"
        options={{
          href: null,
        }}
      />

      {/* Feedback */}
      <Tabs.Screen
        name="Feedback/Feedback"
        options={{
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
      <Tabs.Screen
        name="Feedback/styles/FeedbackStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Feedback/styles/FeedbackFormStyles"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Feedback/components/FeedbackForm"
        options={{
          href: null,
        }}
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
