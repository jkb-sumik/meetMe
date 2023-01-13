import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import colors from "../constants/colors";
import ProfileImage from "./ProfileImage";

const DataItem = (props) => {
  const { title, image, onPress, age, gender, chat, city } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <ProfileImage uri={image} size={60} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {chat && (
            <Text numberOfLines={1} style={styles.subTitle}>
              City: {city}
            </Text>
          )}
          {!chat && (
            <View style={{ flexDirection: "row" }}>
              <Text numberOfLines={1} style={styles.subTitle}>
                Age: {age}
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...styles.subTitle, ...{ marginLeft: 10 } }}
              >
                Gender: {gender}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 7,
    borderBottomColor: colors.backgroundBlue,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 80,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontFamily: "medium",
    fontSize: 22,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: colors.grey,
    fontSize: 16,
  },
});

export default DataItem;
