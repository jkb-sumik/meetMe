import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import defaultProfile from "../assets/userImage.jpeg";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/imahePickerHelper";
import { useState } from "react";
import { updatedSignedInUserData } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../store/authSlice";

const ProfileImage = ({ size, uri, uId, showEdit, margin }) => {
  const dispatch = useDispatch();
  const source = uri ? { uri } : defaultProfile;
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const userId = uId;
  const showEditButton = showEdit && showEdit === true;
  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;

      setIsLoading(true);
      //Upload the image
      const uploadUrl = await uploadImageAsync(tempUri);

      setIsLoading(false);

      if (!uploadUrl) {
        throw new Error("Could not upload image");
      }

      const newData = { profilePicture: uploadUrl };

      await updatedSignedInUserData(userId, newData);
      dispatch(updateLoggedInUserData({ newData }));

      // Set the image
      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Container = showEdit ? TouchableOpacity : View;

  return (
    <Container
      onPress={pickImage}
      style={{
        ...styles.container,
        ...{ width: size, height: size, marginBottom: margin },
      }}
    >
      {isLoading ? (
        <View
          style={{
            ...styles.loadingContainer,
            ...{ width: size, height: size },
          }}
        >
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : (
        <Image style={styles.image} source={image} />
      )}

      {showEditButton && !isLoading && (
        <View style={styles.editIconContainer}>
          <FontAwesome name="pencil" size={15} color="black" />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  editIconContainer: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileImage;
