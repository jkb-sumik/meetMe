import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Modal } from "react-native";
import PageContainer from "../components/PageContainer";
import EventItem from "../components/EventItem";
import { Calendar } from "react-native-calendars";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import { useSelector } from "react-redux";

const CalendarScreen = (props) => {
  const [searchDate, setSearchDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const event = Object.values(
    useSelector((state) => state.calendar.storedEvents)
  );
  const eventToDisplay = searchDate
    ? event.filter((event) => event.timeDate.slice(0, 10) == searchDate)
    : event;

  // Marked days logic
  const daysToMarked = {
    [searchDate]: {
      customStyles: {
        container: {
          backgroundColor: colors.primary500,
        },
        text: {
          color: colors.primary100,
          fontWeight: "bold",
        },
      },
    },
  };

  event.forEach((event) => {
    const date = event.timeDate.slice(0, 10);
    if (date == searchDate) {
      daysToMarked[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.primary500,
          },
          text: {
            color: colors.primary100,
            fontWeight: "bold",
          },
        },
      };
    } else {
      daysToMarked[date] = { marked: true, dotColor: colors.primary500 };
    }
  });

  // Navigate to info screen
  const userPressed = (eventId) => {
    props.navigation.navigate("EventInfo", {
      selectedEventId: eventId,
      calendar: true,
    });
  };

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <Text style={styles.searchBox}>{searchDate || "All events"}</Text>
        <MaterialIcons
          name="clear"
          size={30}
          color="white"
          style={{ marginRight: 15 }}
          onPress={() => setSearchDate("")}
        />
        <FontAwesome
          name="calendar"
          size={25}
          color="white"
          onPress={() => setShowModal(true)}
        />
      </View>

      {!eventToDisplay.length ? (
        <View style={commonStyles.center}>
          <Text>No events ?</Text>
        </View>
      ) : (
        <FlatList
          data={eventToDisplay}
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

      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <Calendar
            style={styles.calendar}
            onDayPress={(date) => {
              setSearchDate(date.dateString);
              setShowModal(false);
            }}
            markingType={"custom"}
            markedDates={daysToMarked}
            theme={{
              calendarBackground: "#333",
              textSectionTitleColor: "white",
              monthTextColor: "white",
              dayTextColor: "white",
              textDisabledColor: "black",
              arrowColor: "white",
              todayTextColor: colors.primary500,
            }}
          />
        </View>
      </Modal>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 25,
    width: "75%",
    color: "white",
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
});

export default CalendarScreen;
