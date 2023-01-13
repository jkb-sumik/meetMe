import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comming soon help!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontFamily: "regular",
    fontSize: 30,
    color: colors.primary100,
  },
});

export default HelpScreen;
