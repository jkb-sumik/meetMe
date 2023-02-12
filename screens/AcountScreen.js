import { StyleSheet, Text, View, Modal } from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import SubmitButton from "../components/SubmitButton";
import ProfileImage from "../components/ProfileImage";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../utils/actions/authActions";
import colors from "../constants/colors";
import { useEffect } from "react";
import { useState } from "react";

const AcountScreen = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [show, setShow] = useState(false);
  const { age, about, firstLast, gender, profilePicture, city } = userData;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="md-settings-outline"
          size={24}
          color="black"
          onPress={() => setShow(true)}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, []);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const goToSettings = () => {
    setShow(false);
    props.navigation.navigate("Settings");
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
          <Text style={styles.subtitle}>City: {city}</Text>
          <Text style={styles.about}>{about}</Text>
        </View>
      </View>
      <Modal visible={show} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsView}>
            <View style={{ alignItems: "flex-end" }}>
              <Feather
                name="x"
                size={30}
                color="#333"
                onPress={() => setShow(false)}
              />
            </View>
            <SubmitButton
              title="Settings"
              onPress={() => goToSettings()}
              style={{ marginTop: 20 }}
              color={colors.primary500}
            />
            <SubmitButton
              title="Log out"
              onPress={logoutHandler}
              style={{ marginTop: 10 }}
              color={colors.primary500}
            />
          </View>
        </View>
      </Modal>
    </PageContainer>
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
});

export default AcountScreen;
