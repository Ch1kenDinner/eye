import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories } from "../common/const";

interface IMainState {
  currentCategory: string;
  videoId?: string;
  searchQuery?: string;
  channelId?: string;
}

const initialState: IMainState = {
  currentCategory: categories[0].name,
};

export const { reducer: mainReducer, actions: mainActions } = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    reset: (state, { payload }: PayloadAction<void>) => {
      state.channelId = undefined;
      state.videoId = undefined;
      state.searchQuery = undefined;
      state.currentCategory = initialState.currentCategory;
    },
    setField: <T extends keyof IMainState>(
      state,
      { payload }: PayloadAction<{ field: T; value: IMainState[T] }>
    ) => {
      state[payload.field] = payload.value;
    },
  },
});
