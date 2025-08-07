import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
// TODO: Implement token management using localStorage if/when token-based authentication is required.
const userFromStorage = localStorage.getItem('user');

const initialState = {
  isAuthenticated:!!userFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
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
     

      // Clear localStorage
      // localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
