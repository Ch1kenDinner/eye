import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { mainReducer } from "./mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});


export const useCustomSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export const useCustomDispatch: () => typeof store.dispatch = useDispatch