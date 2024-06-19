import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import donationReducer from "./donation/DonationSlice";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  sharedState: string;
}

const initialState: AppState = {
  sharedState: 'initialValue',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSharedState: (state, action: PayloadAction<string>) => {
      state.sharedState = action.payload;
    },
  },
});

export const { setSharedState } = appSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: {
    donation: donationReducer,
    app: appSlice.reducer,
  },
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import donationReducer from "./donation/DonationSlice";
// import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

// const store = configureStore({
//   reducer: {
//     donation: donationReducer,
//   },
//   middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().prepend(), createStateSyncMiddleware({})],
//   // (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware({})),
// });

// initMessageListener(store);