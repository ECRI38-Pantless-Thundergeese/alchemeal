import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appPage: '/', // /, /feature, /signup, /profile
  globalUser: '',
  isLoggedIn: false,
  oAuthEnabled: true,
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    resetApp(state, action) {
      return initialState;
    },
    setAppPage(state, action) {
      state.appPage = action.payload;
    },
    setGlobalUser(state, action) {
      state.globalUser = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setOAuthEnable(state, action) {
      state.oAuthEnabled = action.payload;
    },
  },
});

export const {
  resetApp,
  setAppPage,
  setGlobalUser,
  setIsLoggedIn,
  setOAuthEnable,
} = controlSlice.actions;

export default controlSlice.reducer;
