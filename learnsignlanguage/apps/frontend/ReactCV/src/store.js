import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/redux/authSlice.js';
import scoreReducer from '../src/redux/score.js'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    score: scoreReducer,
   
  },
});
export default store;