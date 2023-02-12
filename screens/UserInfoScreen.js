import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import ProfileImage from "../components/ProfileImage";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";

const UserInfoScreen = (props) => {
  const userId = props.route?.params?.selectedUserId;
  const userData = useSelector((state) => state.users.storedUsers[userId]);
  const { age, about, firstLast, gender, profilePicture, coords } = userData;

  const handleChat = (userId) => {
    props.navigation.navigate("ChatList", {
      selectedUserId: userId,
    });
  };

  const handleMap = (userId) => {
    props.navigation.navigate("Map", {
      selectedUserCoords: coords,
    });
  };

  return (
    <PageContainer style={styles.formContainer}>
      <View style={styles.card}>
        <View
          style={{ alignItems: "center", transform: [{ translateY: -110 }] }}
        >
          <ProfileImage uri={profilePicture} size={200} margin={20} />
          <PageTitle text={firstLast} />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subtitle}>Age: {age}</Text>
            <Text style={{ ...styles.subtitle, ...{ marginLeft: 10 } }}>
              Gender: {gender}
            </Text>
          </View>
          <Text style={styles.about}>{about}</Text>
        </View>
        <View style={styles.containerButton}>
          <SubmitButton
            title="Chat"
            color={colors.primary500}
            style={{ width: "35%" }}
            onPress={() => {
              handleChat(userId);
            }}
          />
          <SubmitButton
            title="Map"
            color={colors.primary500}
            style={{ width: "35%" }}
            onPress={() => handleMap(userId)}
          />
        </View>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: "relative",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    top: 120,
    width: "90%",
    maxHeight: 600,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 20,
    padding: 15,
  },
  subtitle: {
    fontFamily: "regular",
    color: colors.lightGrey,
    fontSize: 20,
  },
  about: {
    fontFamily: "regular",
    fontSize: 15,
    textAlign: "justify",
    lineHeight: 20,
    marginTop: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 50,
    transform: [{ translateY: -40 }],
  },
});

export default UserInfoScreen;
