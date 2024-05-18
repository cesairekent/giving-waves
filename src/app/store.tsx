import { configureStore } from "@reduxjs/toolkit";
import donationReducer from "./donation/DonationSlice";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

const store = configureStore({
  reducer: {
    donation: donationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware({})),
});

initMessageListener(store);

export default store;
