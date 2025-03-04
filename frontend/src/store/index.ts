import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      token: localStorage.getItem('token'),
      isAuthenticated: !!localStorage.getItem('token'),
    },
  },
});

export default store;