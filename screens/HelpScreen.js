import { StyleSheet, Text, View } from "react-native";
import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";

const HelpScreen = () => {
  return (
    <PageContainer>
      <View style={styles.container}>
        <Text style={styles.text}>Comming soon help!</Text>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "regular",
    fontSize: 30,
    color: colors.primary100,
  },
});

export default HelpScreen;
