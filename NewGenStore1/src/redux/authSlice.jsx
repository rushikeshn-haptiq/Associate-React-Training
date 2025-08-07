import { createSlice } from '@reduxjs/toolkit';
const userFromStorage = localStorage.getItem('user');


let parsedUser = null;
if (userFromStorage) {
  try {
    parsedUser = JSON.parse(userFromStorage);
  } catch (e) {
    parsedUser = null;
  }
}
const initialState = {
  isAuthenticated: !!userFromStorage,
  user:parsedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;


      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
