import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const EventItem = ({ title, subTitle, image, onPress, city }) => {
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
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{city}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontFamily: "regular",
    fontSize: 30,
  },
});

export default EventItem;
