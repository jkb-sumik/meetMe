import { useState } from "react";
import { Image, StyleSheet, Text, View, Modal } from "react-native";
import { useSelector } from "react-redux";
import SubmitButton from "../components/SubmitButton";
import colors from "../constants/colors";

const EventInfoScreen = (props) => {
  const eventId = props.route?.params?.selectedEventId;
  const calendar = props.route?.params?.calendar;
  const eventsData = useSelector((state) => state.events.storedEvents);
  const calendarData = useSelector((state) => state.calendar.storedEvents);
  const thisEvent = calendar ? calendarData[eventId] : eventsData[eventId];
  const [activeModal, setActiveModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const { title, addres, about, timeDate } = thisEvent;
  const time = `${timeDate
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-")}  ${timeDate.slice(11, 16)}`;

  const addToCalendar = () => {
    console.log("Dodano");
    console.log(selectedEvent);
    setActiveModal(false);
    setSelectedEvent("");
  };

  const deleteFromCalendar = () => {
    console.log("Usunieto");
    console.log(selectedEvent);
    setActiveModal(false);
    setSelectedEvent("");
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <Image style={styles.image} source={{ uri: thisEvent.image }} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{ ...styles.title, marginBottom: 10 }}>{title}</Text>
          <Text style={{ ...styles.text, fontSize: 15 }}>{time}</Text>
          <Text style={{ ...styles.text, fontSize: 15, marginBottom: 5 }}>
            {addres}
          </Text>
          <Text style={styles.about}>About the event</Text>
          <Text
            style={{
              ...styles.text,
              ...styles.aboutText,
            }}
          >
            {about}
          </Text>
          <SubmitButton
            title={calendar ? "Delete from calendar ?" : "Add to calendar ?"}
            color={colors.primary500}
            onPress={() => {
              setActiveModal(true);
              setSelectedEvent(eventId);
            }}
          />
        </View>
      </View>
      <Modal visible={activeModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsView}>
            <Text style={styles.modalTitle}>
              {calendar ? "Delete this event ?" : "Save this event ?"}
            </Text>
            <SubmitButton
              title="Yes"
              onPress={calendar ? deleteFromCalendar : addToCalendar}
              style={{ marginTop: 20 }}
              color={colors.primary500}
            />
            <SubmitButton
              title="No"
              onPress={() => {
                console.log("Nie");
                setActiveModal(false);
              }}
              style={{ marginTop: 10 }}
              color={colors.primary500}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  settingsView: {
    width: "80%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 400,
  },
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  card: {
    marginTop: 250,
    width: "90%",
    minHeight: 350,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  title: {
    color: "#333",
    fontFamily: "bold",
    fontSize: 30,
  },
  text: {
    color: "#555",
    fontFamily: "regular",
  },
  about: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 12,
    textAlign: "justify",
    lineHeight: 17,
    marginBottom: 20,
  },
});

export default EventInfoScreen;
