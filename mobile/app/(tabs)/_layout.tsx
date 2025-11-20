// NAVBAR FOR USER ONLY

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, Dimensions } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function TabsLayout() {
  const { user } = useAuth();

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

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
        {/* User: Home */}
        <Tabs.Screen
          name="Homepage/Home"
          options={{
            href: isOrganizer ? null : undefined, // hide user home for organizers
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

        {/* Hidden Files in Homepage */}
        <Tabs.Screen
          name="Homepage/styles/HomeStyles"
          options={{ href: null }}
        />
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

        {/* User: Event */}
        <Tabs.Screen
          name="Eventpage/Event"
          options={{
            href: isOrganizer ? null : undefined, // hide user event for organizers
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
          name="Eventpage/components/queuing"
          options={{ href: null }}
        />
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

        {/* User: Feedback */}
        <Tabs.Screen
          name="Feedback/Feedback"
          options={{
            href: isOrganizer ? null : undefined, // hide user feedback for organizers
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

        {/* User: Notification */}
        <Tabs.Screen
          name="Notification/Notification"
          options={{
            href: isOrganizer ? null : undefined, // hide user notification for organizers
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

        {/* Hidden Files in Notification */}
        <Tabs.Screen
          name="Notification/styles/NotificationStyles"
          options={{ href: null }}
        />

        {/* Organizer: Home Page */}
        <Tabs.Screen
          name="Homepage/OrgHome"
          options={{
            // href: isOrganizer ? undefined : null, //hides the organizer's home to user
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        {/* Organizer: Event Page */}
        <Tabs.Screen
          name="Eventpage/OrgEvent"
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
        {/* Scanner/Dashboard - Show ONLY for Organizers */}
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
        {/* Organizer: Notifcation */}
        <Tabs.Screen
          name="Notification/OrgNotification"
          options={{
            // href: isOrganizer ? null : undefined, // hide user notification for organizers
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

        {/* Hide Organizer folder from tabs */}
        <Tabs.Screen name="Organizer" options={{ href: null }} />
        <Tabs.Screen
          name="Organizer/Dashboard/styles"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="Organizer/Dashboard/components"
          options={{ href: null }}
        />
      </Tabs>
    </View>
  );
}
