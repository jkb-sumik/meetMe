import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import EventItem from "../components/EventItem";
import { useDispatch, useSelector } from "react-redux";

const EVENTS = {
  "734hf3h47fh3784f734fh": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 1",
    about: "Lalalalalalala",
    eventId: "734hf3h47fh3784f734fh",
    city: "Bielsko",
  },
  "834975nc8734975fh3478": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 2",
    about: "Lalalalalalala",
    eventId: "834975nc8734975fh3478",
    city: "Bielsko",
  },
  "834975nc8734978": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 7",
    about: "Lalalalalalala",
    eventId: "834975nc8734975fh3478",
    city: "Bielsko",
  },
  "2357cbeurfger65757575": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 3",
    about: "Lalalalalalala",
    eventId: "2357cbeurfger65757575",
    city: "Katowice",
  },
  "121212nhbc34444frgurg": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 4",
    about: "Lalalalalalala",
    eventId: "121212nhbc34444frgurg",
    city: "Katowice",
  },
};

const EventsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const cityEvents = Object.values(EVENTS).filter(
    (item) => item.city === userData.city
  );
  console.log(cityEvents);

  // useEffect(() => {
  //   const delaySearch = setTimeout(async () => {
  //     if (!userData.city || userData.city === "") {
  //       setUsers();
  //       setNoResultsFound(false);
  //       return;
  //     }
  //     setIsLoading(true);

  //     // const usersResult =
  //     const usersResult = await searchUsers(userData.city);
  //     //Usuwanie siebie z wynikow
  //     delete usersResult[userData.userId];
  //     setUsers(usersResult);

  //     if (Object.keys(usersResult).length === 0) {
  //       setNoResultsFound(true);
  //     } else {
  //       setNoResultsFound(false);
  //       dispatch(setStoredUsers({ newUsers: usersResult }));
  //     }

  //     setIsLoading(false);
  //   }, 500);
  //   return () => clearTimeout(delaySearch);
  // }, [userData.city]);

  const userPressed = (eventId) => {
    navigation.navigate("EventInfo", {
      selectedEventId: eventId,
    });
  };

  return (
    <PageContainer>
      {isLoading && (
        <View style={commonStyles.center}>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      )}

      {!isLoading && !noResultsFound && events && (
        <FlatList
          data={cityEvents}
          renderItem={({ item }) => {
            const { title, about, image, eventId, city } = item;

            return (
              <EventItem
                title={title}
                subTitle={about}
                image={image}
                city={city}
                onPress={() => userPressed(eventId)}
              />
            );
          }}
        />
      )}

      {!isLoading && noResultsFound && (
        <View style={commonStyles.center}>
          <FontAwesome
            name="question"
            size={55}
            color={colors.lightGrey}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>
            No events found for {userData.city} city!
          </Text>
        </View>
      )}
      {!isLoading && !events && (
        <View style={commonStyles.center}>
          <FontAwesome
            name="users"
            size={55}
            color={colors.lightGrey}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>
            Enter a city to search for a events!
          </Text>
        </View>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});

export default EventsScreen;
