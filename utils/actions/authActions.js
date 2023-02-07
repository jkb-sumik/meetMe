import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { authenticate, logout } from "../../store/authSlice";

const firebaseConfig = {
  apiKey: "AIzaSyBFV68g5iLTXURiYciZbr4lQFc703lkfPk",

  authDomain: "meet-me-20c3a.firebaseapp.com",

  projectId: "meet-me-20c3a",

  storageBucket: "meet-me-20c3a.appspot.com",

  messagingSenderId: "339671718616",

  appId: "1:339671718616:web:afdfc10f46747c0b1a15ad",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let timer;

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime).toISOString();

      //Tworzenie czasu
      const timeNow = new Date();
      const timeFromExpirationTime = new Date(expirationTime);
      //Wyciagiecie czasu ze scwiezego tokena da nam godzine czasu zanim nas wyloguje
      const millisecondsUntilExpiry = timeFromExpirationTime - timeNow;

      // Tworzenie usera
      await createUser(firstName, lastName, email, uid);

      //Pobierz usera
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      //Wyslanie do state w redux danych usera i tokenu
      dispatch(authenticate({ token: accessToken, userData }));
      // Wyslanie do asyncstorage
      saveDataToStorage(accessToken, uid, expiryDate);
      //Tworzenie timeouta dla wylogowania
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errorCode = error.code;
      let message = "Something went wrong. SignUp function";
      if (errorCode === "auth/email-already-in-use") {
        message = "This email is already in use";
      }
      throw new Error(message);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime).toISOString();

      //Tworzenie czasu
      const timeNow = new Date();
      const timeFromExpirationTime = new Date(expirationTime);
      //Wyciagiecie czasu ze scwiezego tokena da nam godzine czasu zanim nas wyloguje
      const millisecondsUntilExpiry = timeFromExpirationTime - timeNow;

      //Pobierz usera
      const userData = await getUserData(uid);

      //Wyslanie do state w redux danych usera i tokenu
      dispatch(authenticate({ token: accessToken, userData }));
      // Wyslanie do asyncstorage
      saveDataToStorage(accessToken, uid, expiryDate);

      //Tworzenie timeouta dla wylogowania
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      let message = "Something went wrong. SignIn function";
      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        message = "Wrong password or user doesn't exist";
      }
      throw new Error(message);
    }
  };
};

const createUser = async (firstName, lastName, email, userId) => {
  const signUpDate = new Date().toISOString();
  const firstLast = `${firstName} ${lastName}`;
  await setDoc(doc(db, "users", userId), {
    firstName,
    lastName,
    firstLast,
    email,
    signUpDate,
    userId,
  });
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate,
    })
  );
};

export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
    // return userData;
    // console.log(userData);
  } catch (error) {
    console.log("Funckja getUserData" + error);
  }
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

export const updatedSignedInUserData = async (userId, newData) => {
  if (newData.firstName && newData.lastName) {
    const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
    newData.firstLast = firstLast;
  }
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, newData);
  const updatedUserData = await getUserData(userId);
  return updatedUserData;
};

export const searchUsers = async (queryText) => {
  const searchTerm = queryText;
  const usersArray = {};
  try {
    const q = query(collection(db, "users"), where("city", "==", searchTerm));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log(doc.id);
      // usersArray.push(data);
      usersArray[doc.id] = data;
    });
    return usersArray;
  } catch (error) {
    console.log(error);
  }
};

export const searchActiveUsers = async (queryText) => {
  const searchTerm = queryText;
  const usersArray = {};
  try {
    const q = query(
      collection(db, "users"),
      where("city", "==", searchTerm),
      where("active", "==", true)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      usersArray[doc.id] = data;
    });
    return usersArray;
  } catch (error) {
    console.log(error);
  }
};
