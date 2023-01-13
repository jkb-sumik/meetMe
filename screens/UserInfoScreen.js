import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import ProfileImage from "../components/ProfileImage";
import colors from "../constants/colors";

const UserInfoScreen = (props) => {
  const userId = props.route?.params?.selectedUserId;
  const userData = useSelector((state) => state.users.storedUsers[userId]);
  const { age, about, firstLast, gender, profilePicture } = userData;

  const handleChat = (userId) => {
    props.navigation.navigate("ChatList", {
      selectedUserId: userId,
    });
  };

  const handleMap = () => {
    props.navigation.navigate("Map", {
      selectedUserId: userId,
    });
  };

  return (
    <PageContainer style={styles.formContainer}>
      <ProfileImage uri={profilePicture} size={200} margin={20} />
      <PageTitle text={firstLast} />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.subtitle}>Age: {age}</Text>
        <Text style={{ ...styles.subtitle, ...{ marginLeft: 10 } }}>
          Gender: {gender}
        </Text>
      </View>
      <Text style={styles.about}>{about}</Text>
      <View style={styles.containerButton}>
        <Ionicons
          name="chatbubbles"
          color={colors.backgroundBlue}
          size={50}
          onPress={() => {
            handleChat(userId);
          }}
        />
        <Ionicons
          name="map"
          color={colors.backgroundBlue}
          size={50}
          onPress={handleMap}
        />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "regular",
    color: colors.lightGrey,
    fontSize: 20,
  },
  about: {
    marginTop: 20,
    fontFamily: "regular",
    fontSize: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 200,
    width: "100%",
    height: 50,
  },
});

export default UserInfoScreen;
