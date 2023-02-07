import { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const EventItem = (props) => {
  const { event, onPress } = props;
  const { title, image, addres, about, timeDate } = event;
  const description = `${about.slice(0, 70)}...`;
  const time = `${timeDate
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-")}  ${timeDate.slice(11, 16)}`;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.eventItem}>
        <ImageBackground
          source={{ uri: image }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={{ ...styles.text, fontSize: 15 }}>{time}</Text>
            <Text style={{ ...styles.text, fontSize: 15, marginBottom: 5 }}>
              {addres}
            </Text>
            <Text style={{ ...styles.text, fontSize: 12 }}>{description}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontFamily: "bold",
    fontSize: 30,
  },
  text: {
    color: "white",
    fontFamily: "regular",
  },
});

export default EventItem;
