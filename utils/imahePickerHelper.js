import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { app } from "./actions/authActions";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const launchImagePicker = async () => {
  // Nie potrzebujemy nic z tego poniewaz zgoda bedzie zpisana w wewnatrz a jak jej nie otrzymamy to wywali error i linie ponizesz sie nie wykonaja
  await checkMediaPermissions();

  const result = await ImagePicker.launchImageLibraryAsync({
    //Wybieramy do czego mamy miec odtsep np. Image, Camera itd
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri;
  }
};

const checkMediaPermissions = async () => {
  //Tutaj udzielamy pozwolenia na dostep do galeri dla naszej aplikacji
  if (Platform.OS !== "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      return Promise.reject("We need permission to access your photos");
    }
  }
  return Promise.resolve();
};

export const uploadImageAsync = async (uri) => {
  const appInit = app;

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send();
  });

  const pathFolder = "profilePics";
  const storageRef = ref(getStorage(appInit), `${pathFolder}/${uuidv4()}`);

  await uploadBytesResumable(storageRef, blob);

  blob.close();
  return await getDownloadURL(storageRef);
};
