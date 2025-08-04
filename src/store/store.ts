import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import authReducer from './slices/authSlice';
import createTeamReducer from './slices/createTeamSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    createTeam: createTeamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
