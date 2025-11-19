// NAVBAR FOR USER ONLY

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Octicons from "react-native-vector-icons/Octicons";
import { View, Platform } from "react-native";

export default function TabsLayout() {
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
            elevation: 15 , // Android shadow
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
          name="Notification/styles/NotificationStyles"
          options={{
            href: null,
          }}
        />
        {/* Hidden Files in Notification */}
        <Tabs.Screen
          name="Organizer/Dashboard/Dashboard"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
