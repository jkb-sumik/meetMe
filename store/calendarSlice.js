import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    storedEvents: {},
  },
  reducers: {
    setStoredCalendarEvents: (state, action) => {
      const newEvents = action.payload.newEvents;
      const existingEvents = state.storedEvents;
      const eventsArray = Object.values(newEvents);
      for (let i = 0; i < eventsArray.length; i++) {
        const eventData = eventsArray[i];
        existingEvents[eventData.eventId] = eventData;
      }
      state.storedEvents = existingEvents;
    },
  },
});

export const setStoredCalendarEvents =
  calendarSlice.actions.setStoredCalendarEvents;
export default calendarSlice.reducer;
