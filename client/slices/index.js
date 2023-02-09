import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  appPage: '/', // /, /feature, /signup, /profile
  globalUser: '',
  isLoggedIn: false,
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
      console.log(current(state));
    },
    setGlobalUser(state, action) {
      state.globalUser = action.payload;
      console.log(current(state));
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      console.log(current(state));
    },
  },
});

export const { resetApp, setAppPage, setGlobalUser, setIsLoggedIn } =
  controlSlice.actions;

export default controlSlice.reducer;
