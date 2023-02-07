import { Image, StyleSheet, Text, View } from "react-native";
import SubmitButton from "../components/SubmitButton";
import { EVENTS } from "../constants/events";

const EventInfoScreen = (props) => {
  const eventId = props.route?.params?.selectedEventId;
  const thisEvent = EVENTS[eventId];
  const { title, addres, about, timeDate } = thisEvent;
  const time = `${timeDate
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-")}  ${timeDate.slice(11, 16)}`;
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
          <Text
            style={{
              fontWeight: "bold",
              color: "#333",
              fontSize: 18,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            About the event
          </Text>
          <Text
            style={{
              ...styles.text,
              fontSize: 12,
              textAlign: "justify",
              lineHeight: 17,
              marginBottom: 20,
            }}
          >
            {about}
          </Text>
          <SubmitButton
            title="Add to calendar"
            onPress={() => console.log("Add to calendar")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EventInfoScreen;
