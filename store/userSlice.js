import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    storedUsers: {},
    activeUsers: {},
  },
  reducers: {
    setStoredUsers: (state, action) => {
      const newUsers = action.payload.newUsers;
      const existingUsers = state.storedUsers;
      const usersArray = Object.values(newUsers);
      for (let i = 0; i < usersArray.length; i++) {
        const userData = usersArray[i];
        existingUsers[userData.userId] = userData;
      }
      state.storedUsers = existingUsers;
    },
    setActiveUsers: (state, action) => {
      const newUsers = action.payload.newUsers;
      const usersArray = Object.values(newUsers);
      state.activeUsers = usersArray;
    },
  },
});

export const setStoredUsers = userSlice.actions.setStoredUsers;
export const setActiveUsers = userSlice.actions.setActiveUsers;
export default userSlice.reducer;
