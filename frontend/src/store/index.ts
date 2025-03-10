import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      token: localStorage.getItem('token'),
      isAuthenticated: !!localStorage.getItem('token'),
    },
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

