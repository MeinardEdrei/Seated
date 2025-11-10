import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform } from "react-native";

export default function TabsLayout() {
  return (
    // <View
    //   style={{
    //     backgroundColor: '#ffffffff',
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#941418", // `Changed to burgundy for text
        tabBarInactiveTintColor: "#000000", // Changed to black
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          // alignSelf: "center",
          width: "90%",
          backgroundColor: "#ffffffff",
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
        tabBarItemStyle: {
          marginTop: 5,
          paddingVertical: 5,
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
        name="Homepage/home"
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Notification */}
      <Tabs.Screen
        name="Notification/notification"
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
    // </View>
  );
}

