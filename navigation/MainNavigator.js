import React, { useEffect, useState } from "react";
import AcountScreen from "../screens/AcountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import NewChatScreen from "../screens/NewChatScreen";
import MapScreen from "../screens/MapScreen";
import EventsScreen from "../screens/EventsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import HelpScreen from "../screens/HelpScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import ProfileImage from "../components/ProfileImage";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../utils/actions/authActions";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { setChatsData } from "../store/chatSlice";
import { ActivityIndicator, View } from "react-native";
import { setStoredUsers } from "../store/userSlice";
import { setChatMessages } from "../store/messagesSlice";
import { updatedSignedInUserData } from "../utils/actions/authActions";
import { updateLoggedInUserData } from "../store/authSlice";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import EventInfoScreen from "../screens/EventInfoScreen";
import * as Location from "expo-location";
import { setStoredCalendarEvents } from "../store/calendarSlice";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#333",
        },
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        overlayColor: 1,
        //Pasek on menu
        drawerContentStyle: { backgroundColor: "#a9a9a9" },
        drawerInactiveTintColor: "#333",
        drawerActiveTintColor: "#333",
        drawerActiveBackgroundColor: colors.primary500,
      }}
    >
      <Drawer.Screen
        name="Account"
        component={AcountScreen}
        options={{
          title: "Account",
          drawerIcon: ({ size }) => (
            <ProfileImage uri={userData.profilePicture} size={50} />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search People"
        component={NewChatScreen}
        options={{
          title: "Search People",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          title: "Chats",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: "Events",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="party-popper"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "Calendar",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: "Help and Support",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTitleStyle: {
          color: "#333",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="Info"
        component={UserInfoScreen}
        options={{
          headerTitle: "Info",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EventInfo"
        component={EventInfoScreen}
        options={{
          headerTitle: "Info",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);

  // Snapshot listener to firebase for our chats
  useEffect(() => {
    console.log("Subscribe to firebae listeners");
    const chatsRef = doc(db, "userChats", userData.userId);
    const unsubChats = onSnapshot(chatsRef, (querySnapshot) => {
      const chatIdData = querySnapshot.data() || {};
      const chatIds = Object.values(chatIdData);

      const chatsData = {};
      let chatsFoundCount = 0;

      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatRef = doc(db, "chats", chatId);
        //Tu mozliwe ze bedzie problem z usunieciec listenera ??? odcinek 128

        onSnapshot(chatRef, (chatSnapshot) => {
          chatsFoundCount++;

          const data = chatSnapshot.data().newChatData;

          if (data) {
            data.users.forEach(async (userId) => {
              if (userId === userData.userId) return;
              if (storedUsers[userId]) return;
              const userRef = doc(db, "users", userId);
              const userDataToStore = await getDoc(userRef);
              const usersResult = {
                [userId]: userDataToStore.data(),
              };
              dispatch(setStoredUsers({ newUsers: usersResult }));
            });

            chatsData[chatId] = data;
          }
          if (chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }
        });

        const messagesRef = doc(db, "messages", chatId);
        onSnapshot(messagesRef, (messagesSnapshot) => {
          const messagesData = messagesSnapshot.data();
          dispatch(setChatMessages({ chatId, messagesData }));
        });

        if (chatsFoundCount == 0) {
          setIsLoading(false);
        }
      }
    });
    //Kiedy komponent jest usuwany odmontowywany to zadzia??a ten kod z return
    return () => {
      console.log("Unsubscribe to firebae listeners");
      unsubChats();
    };
  }, []);

  // Get users events
  useEffect(() => {
    (async () => {
      const eventsRef = doc(db, "userEvents", userData.userId);
      const docSnap = await getDoc(eventsRef);

      if (docSnap.exists()) {
        const data = Object.keys(docSnap.data());
        data.forEach(async (eventId) => {
          const eventRef = doc(db, "events", eventId);
          const eventDataToStore = await getDoc(eventRef);
          const eventsResult = {
            [eventId]: eventDataToStore.data(),
          };
          dispatch(setStoredCalendarEvents({ newEvents: eventsResult }));
        });
      }
    })();
  }, []);

  // Get our location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const data = await updatedSignedInUserData(userData.userId, {
        coords: {
          latitude,
          longitude,
        },
      });
      dispatch(updateLoggedInUserData({ newData: data }));
    })();
  }, []);

  // User status
  useEffect(() => {
    const changeStatus = async () => {
      await updatedSignedInUserData(userData.userId, { active: true });
    };
    changeStatus();
    return () => {
      console.log("Change user status");
      updatedSignedInUserData(userData.userId, { active: false });
    };
  }, []);

  if (isLoading) {
    <View style={commonStyles.center}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>;
  }

  return <StackNavigator />;
};

export default MainNavigator;
