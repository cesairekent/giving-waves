import { createSlice } from "@reduxjs/toolkit";
import { DonationState } from "./models/DonationState";


const initialState : DonationState = {
  donations: JSON.parse(localStorage.getItem('donations') || '[]'),
  currentDonation: null,
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    createDonation: (state, action) => {
      state.donations.push({ id: Date.now(), ...action.payload });
      console.log("donation created with id: ", Date.now(), action.payload + "New donations list: " + state.donations.length);
      localStorage.setItem("donations", JSON.stringify(state.donations));
      const donationList = JSON.parse(localStorage.getItem('donations') || '[]');
      console.log("New donation list count " + donationList.length);
    },

    readDonation: (state, action) => {
      state.currentDonation = state.donations.find(
        (donation) => donation.id === action.payload
      ) ?? null;
    },

    updateDonation: (state, action) => {
      const donationIndex = state.donations.findIndex(
        (donation) => donation.id === action.payload.id
      );
      state.donations[donationIndex] = {
        id: action.payload.id,
        ...action.payload.updateDonation,
      };
      console.log("donation updated with new donation: " + action.payload + "New donations list: " + state.donations.length);
      localStorage.setItem("donations", JSON.stringify(state.donations));
    },

    deleteDonation: (state, action) => {
      const updatedDonations = state.donations.filter(
        (donation) => donation.id !== action.payload
      );
      console.log("donation deleted with id: " + action.payload);
      localStorage.setItem("donations", JSON.stringify(updatedDonations));
      return { ...state, donations: updatedDonations };
    },

    cleanCurrentDonation: (state) => {
      state.currentDonation = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDonation,
  readDonation,
  updateDonation,
  deleteDonation,
  cleanCurrentDonation,
} = donationSlice.actions;

export default donationSlice.reducer;
