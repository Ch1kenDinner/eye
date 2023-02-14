import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories } from "../common/const";

export interface IMainState {
  currentCategory: string;
  currentTemplate: "index" | "channel" | "details";
  videoId?: string;
  searchQuery?: string;
  channelId?: string;
}

const initialState: IMainState = {
  currentCategory: categories[0].name,
  currentTemplate: "index",
};

export const { reducer: mainReducer, actions: mainActions } = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    reset: (state, { payload }: PayloadAction<void>) => {
      state.currentTemplate = initialState.currentTemplate;
    },
    setField: <T extends keyof IMainState>(
      state,
      { payload }: PayloadAction<{ field: T; value: IMainState[T] }>
    ) => {
      state[payload.field] = payload.value;
    },
  },
});
