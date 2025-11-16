// NAVBAR FOR USER ONLY

import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";
// import { useAuth } from "../../context/AuthContext";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";

export default function TabsLayout() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect organizers away from user tabs
  useEffect(() => {
    if (!isLoading && user?.role === "organizer") {
        router.replace("/Organizer/Dashboard/Dashboard");
    }
  }, [user, isLoading]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#941418" />
      </View>
    );
  }

  // Don't render if user is organizer
  if (user?.role === "organizer") {
    return null;
  }

  console.log("role:",user?.role);
  return (
    <View
      style={{
        backgroundColor: "#ffffffff",
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#941418", // Burgundy for active
          tabBarInactiveTintColor: "#525252", // Gray for inactive
          tabBarStyle: {
            // position: "absolute",
            bottom: 16,
            justifyContent: "center",
            alignSelf: "center",
            // alignItems: "center",
            width: 358,
            backgroundColor: "#ffffffff",
            borderRadius: 20,
            height: 74,
            paddingHorizontal: 10,
            paddingBottom: 8,
            paddingTop: 8,
            borderWidth: 1,
            borderColor: "rgba(82, 82, 82, 0.2)",

            // Drop shadow from Figma settings
            shadowColor: "#1C1C1C",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3, // 30% opacity
            shadowRadius: 4, // corresponds to blur 4
            elevation: 15, // Android shadow
            // borderTopWidth: 0,
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
        {/* Home */}
        <Tabs.Screen
          name="Homepage/Home"
          options={{
            title: "Home",
            tabBarItemStyle: { flex: 1, alignItems: "center" },

            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  {
                    // For icons background
                    // backgroundColor: focused ? "#941418" : "transparent",
                    // borderRadius: 20,
                    // paddingHorizontal: 16,
                    // paddingVertical: 6,
                    // marginTop: 0,
                  }
                }
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
              marginTop: 0,
            },
          }}
        />
        {/* Hidden Files in Homepage */}
        <Tabs.Screen
          name="Homepage/styles/_homeStyles"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Homepage/components/settings"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Homepage/styles/_eventDetailsModalStyles"
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
          name="Eventpage/event"
          options={{
            title: "Event",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  {
                    // For icons background
                    // backgroundColor: focused ? "#941418" : "transparent",
                    // borderRadius: 20,
                    // paddingHorizontal: 16,
                    // paddingVertical: 6,
                    // marginTop: 0,
                  }
                }
              >
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  color={color}
                  size={24}
                />
              </View>
            ),
            tabBarLabelStyle: {
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              marginTop: 0,
            },
          }}
        />
        {/* Hidden Files in Eventpage */}
        <Tabs.Screen
          name="Eventpage/styles/eventStyles"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Eventpage/components/viewEvent"
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
          name="Eventpage/components/queuing"
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
          name="Eventpage/styles/viewEventStyles"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Eventpage/styles/queuingStyles"
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
          name="Feedback/feedback"
          options={{
            title: "Feedback",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  {
                    // For icons background
                    // backgroundColor: focused ? "#941418" : "transparent",
                    // borderRadius: 20,
                    // paddingHorizontal: 16,
                    // paddingVertical: 6,
                    // marginTop: 0,
                  }
                }
              >
                <Ionicons
                  name={focused ? "chatbubbles" : "chatbubbles-outline"}
                  color={color}
                  size={24}
                />
              </View>
            ),
            tabBarLabelStyle: {
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              marginTop: 0,
            },
          }}
        />
        {/* Hidden Files in Feedback */}
        <Tabs.Screen
          name="Feedback/styles/feedbackStyles"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Feedback/styles/feedbackFormStyles"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="Feedback/components/feedbackForm"
          options={{
            href: null,
          }}
        />

        {/* Notification */}
        <Tabs.Screen
          name="Notification/notification"
          options={{
            title: "Notification",
            tabBarItemStyle: { flex: 1, alignItems: "center" },
            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  {
                    // For icons background
                    // backgroundColor: focused ? "#941418" : "transparent",
                    // borderRadius: 20,
                    // paddingHorizontal: 16,
                    // paddingVertical: 6,
                    // marginTop: 0,
                  }
                }
              >
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  color={color}
                  size={24}
                />
              </View>
            ),
            tabBarLabelStyle: {
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              marginTop: 0,
            },
          }}
        />
        {/* Hidden Files in Notification */}
        <Tabs.Screen
          name="Notification/styles/notificationStyles"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
