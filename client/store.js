/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices';

const store = configureStore({
  reducer: {
    control: controlSlice,
  },
});

export default store;
