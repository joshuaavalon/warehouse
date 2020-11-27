import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import storage from "./storage";
import location from "./location";
import product from "./product";

const reducer = combineReducers({
  storage,
  location,
  product
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
