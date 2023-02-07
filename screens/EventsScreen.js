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
import { EVENTS } from "../constants/events";

const EventsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const cityEvents = Object.values(EVENTS).filter(
    (item) => item.city === userData.city
  );

  const userPressed = (eventId) => {
    navigation.navigate("EventInfo", {
      selectedEventId: eventId,
      navigation: navigation,
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
