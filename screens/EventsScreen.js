import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import EventItem from "../components/EventItem";
import { useDispatch, useSelector } from "react-redux";
import { searchEvents } from "../utils/actions/authActions";
import { setStoredEvents } from "../store/eventSlice";

const EventsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState();
  const [noResultsFound, setNoResultsFound] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!userData.city || userData.city === "") {
        setEvents();
        setNoResultsFound(false);
        return;
      }
      setIsLoading(true);

      const eventsResult = await searchEvents(userData.city);
      setEvents(Object.values(eventsResult));

      if (Object.keys(eventsResult).length === 0) {
        setNoResultsFound(true);
      } else {
        setNoResultsFound(false);
        dispatch(setStoredEvents({ newEvents: eventsResult }));
      }

      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [userData.city]);

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
          data={events}
          renderItem={({ item }) => {
            return (
              <EventItem
                event={item}
                onPress={() => userPressed(item.eventId)}
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
          <MaterialCommunityIcons
            name="party-popper"
            size={55}
            color={colors.lightGrey}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>Searching for a events ?</Text>
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
