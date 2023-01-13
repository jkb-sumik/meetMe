import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const Bubble = (props) => {
  const { text, type } = props;

  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapperStyle };

  switch (type) {
    case "system":
      textStyle.color = "#65644a";
      bubbleStyle.backgroundColor = colors.beige;
      bubbleStyle.alighItems = "center";
      bubbleStyle.marginTop = 10;
      break;
    case "error":
      textStyle.color = "white";
      bubbleStyle.backgroundColor = colors.red;
      bubbleStyle.alighItems = "center";
      bubbleStyle.marginTop = 10;
      break;
    case "myMessage":
      wrapperStyle.justifyContent = "flex-end";
      textStyle.color = colors.primary100;
      bubbleStyle.backgroundColor = colors.primary500;
      bubbleStyle.maxWidth = "90%";
      break;
    case "theirMessage":
      wrapperStyle.justifyContent = "flex-start";
      textStyle.color = colors.primary500;
      bubbleStyle.backgroundColor = colors.primary100;
      bubbleStyle.maxWidth = "90%";

      break;
    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 7,
    marginBottom: 10,
    borderColor: "#e2dacc",
    borderWidth: 1,
  },
  text: {
    fontFamily: "regular",
    fontSize: 18,
    letterSpacing: 0.3,
  },
});

export default Bubble;
