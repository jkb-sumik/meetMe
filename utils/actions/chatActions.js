import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";

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

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const newChat = await addDoc(collection(db, "chats"), { newChatData });
  //   console.log("Chat written with ID; ", newChat.id);
  const newChatId = newChat.id;
  const userRef = doc(db, "chats", newChatId);
  await updateDoc(userRef, {
    "newChatData.key": newChatId,
  });

  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    const docRef = doc(db, "userChats", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, { [newChatId]: newChatId });
    } else {
      await setDoc(doc(db, "userChats", userId), { [newChatId]: newChatId });
    }
  }
  return newChat.id;
};

export const sendTextMessage = async (chatId, senderId, messageText) => {
  const messageRef = doc(db, "messages", chatId);
  const messageSnap = await getDoc(messageRef);
  const messageId = uuidv4();
  const messageData = {
    [messageId]: {
      sentBy: senderId,
      sentAt: new Date().toISOString(),
      text: messageText,
    },
  };
  if (messageSnap.exists()) {
    await updateDoc(messageRef, messageData);
  } else {
    await setDoc(messageRef, messageData);
  }
  const chatRef = doc(db, "chats", chatId);
  await updateDoc(chatRef, {
    "newChatData.updatedAt": new Date().toISOString(),
    "newChatData.updatedBy": senderId,
    "newChatData.latestMessageText": messageText,
  });
};
