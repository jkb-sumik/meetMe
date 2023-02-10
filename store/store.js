import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import calendarSlice from "./calendarSlice";
import chatSlice from "./chatSlice";
import eventSlice from "./eventSlice";
import messagesSlice from "./messagesSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    chats: chatSlice,
    messages: messagesSlice,
    events: eventSlice,
    calendar: calendarSlice,
  },
});
