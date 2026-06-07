import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from '../store/slice/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;