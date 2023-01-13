import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate, setDidTryAutoLogin } from "../store/authSlice";
import { getUserData } from "../utils/actions/authActions";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthInfo = await AsyncStorage.getItem("userData");
      if (!storedAuthInfo) {
        // console.log("No storage found");
        dispatch(setDidTryAutoLogin());
        return;
      }

      const parsedData = JSON.parse(storedAuthInfo);
      const { token, userId, expiryDate } = parsedData;
      // console.log(typeof expiryDate);
      const expiryDateToObject = new Date(expiryDate);
      // console.log(typeof expiryDateToObject);
      if (expiryDateToObject <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin());
        return;
      }

      //Pobranie danych urzytkownika
      const userData = await getUserData(userId);
      dispatch(authenticate({ token, userData }));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default StartUpScreen;
