import { createSlice } from "@reduxjs/toolkit";
import { DonationModel } from "./models/DonationModel";
import { DonationState } from "./models/DonationState";

const donationList : DonationModel[] = [
  { id: 1, donor: "Emmanuel", donationType: "Financier", amount: 10.00 },
  { id: 2, donor: "Alexandre", donationType: "Materiel", amount: 5.00 },
  { id: 3, donor: "Sophia", donationType: "Materiel", amount: 15.00 },
  { id: 4, donor: "Liam", donationType: "Financier", amount: 20.00 },
  { id: 5, donor: "Olivia", donationType: "Service", amount: 30.00 },
  { id: 6, donor: "Noah", donationType: "Materiel", amount: 25.00 },
  { id: 7, donor: "Isabella", donationType: "Financier", amount: 50.00 },
];

const initialState : DonationState = {
  donations: donationList,
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
