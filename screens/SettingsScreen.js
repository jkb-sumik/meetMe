import React, { useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import ProfileImage from "../components/ProfileImage";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  updatedSignedInUserData,
  userLogout,
} from "../utils/actions/authActions";
import { updateLoggedInUserData } from "../store/authSlice";
import colors from "../constants/colors";
import { useEffect } from "react";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [show, setShow] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const age = userData.age || "";
  const gender = userData.gender || "";
  const city = userData.city || "";
  const about = userData.about || "";

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setShow(true)} title="Info" color="#fff" />
      ),
    });
  }, []);

  const initialState = {
    inputValues: {
      age,
      gender,
      city,
      about,
    },
    inputValidities: {
      age: undefined,
      gender: undefined,
      city: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;
    try {
      setIsLoading(true);
      const data = await updatedSignedInUserData(
        userData.userId,
        updatedValues
      );
      dispatch(updateLoggedInUserData({ newData: data }));

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return (
      currentValues.age != age ||
      currentValues.gender != gender ||
      currentValues.about != about ||
      currentValues.city != city
    );
  };

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={140}
          uId={userData.userId}
          uri={userData.profilePicture}
          showEdit={true}
          margin={20}
        />
        <PageTitle text={`${userData.firstName} ${userData.lastName}`} />
        <Input
          id="age"
          label="Age"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["age"]}
          initialValue={userData.age}
        />

        <Input
          id="gender"
          label="Gender"
          icon="gender-male-female"
          iconPack={MaterialCommunityIcons}
          onInputChanged={inputChangedHandler}
          keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities["gender"]}
          initialValue={userData.gender}
        />

        <Input
          id="city"
          label="City"
          icon="city"
          iconPack={FontAwesome5}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["city"]}
          initialValue={userData.city}
        />

        <Input
          id="about"
          label="About"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["about"]}
          initialValue={userData.about}
        />
        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}
          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                color={colors.primary500}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>
      </ScrollView>
      <Modal visible={show} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsView}>
            <View style={{ alignItems: "flex-end" }}>
              <Feather
                name="x"
                size={30}
                color="white"
                onPress={() => setShow(false)}
              />
            </View>
            <SubmitButton
              title="Settings"
              onPress={() => console.log("button A")}
              style={{ marginTop: 20 }}
              color={colors.primary500}
            />
            <SubmitButton
              title="Logout"
              onPress={logoutHandler}
              style={{ marginTop: 20 }}
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
    opacity: 0.8,
  },
  settingsView: {
    width: "90%",
    padding: 30,
    borderRadius: 10,
    backgroundColor: colors.backgroundBlue,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: "center",
  },
});

export default SettingsScreen;
