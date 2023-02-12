import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    storedEvents: {},
    deleteEvent: "",
  },
  reducers: {
    setStoredEvents: (state, action) => {
      const newEvents = action.payload.newEvents;
      const existingEvents = state.storedEvents;
      const eventsArray = Object.values(newEvents);
      for (let i = 0; i < eventsArray.length; i++) {
        const eventData = eventsArray[i];
        existingEvents[eventData.eventId] = eventData;
      }
      state.storedEvents = existingEvents;
    },
    deleteEventFromStore: (state, action) => {
      const event = action.payload.event;
      state.deleteEvent = event;
    },
  },
});

export const setStoredEvents = eventSlice.actions.setStoredEvents;
export const deleteEventFromStore = eventSlice.actions.deleteEventFromStore;
export default eventSlice.reducer;
