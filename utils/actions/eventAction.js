import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, deleteField } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFV68g5iLTXURiYciZbr4lQFc703lkfPk",

  authDomain: "meet-me-20c3a.firebaseapp.com",

  projectId: "meet-me-20c3a",

  storageBucket: "meet-me-20c3a.appspot.com",

  messagingSenderId: "339671718616",

  appId: "1:339671718616:web:afdfc10f46747c0b1a15ad",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const sendEventToDb = async (userId, eventId) => {
  const userEventsRef = doc(db, "userEvents", userId);
  //   const userEvents = await getDoc(userEventsRef);
  const eventData = {
    [eventId]: eventId,
  };
  await updateDoc(userEventsRef, eventData);
};

export const deleteEventFromDb = async (userId, eventId) => {
  const userEventsRef = doc(db, "userEvents", userId);
  await updateDoc(userEventsRef, {
    [eventId]: deleteField(),
  });
};
