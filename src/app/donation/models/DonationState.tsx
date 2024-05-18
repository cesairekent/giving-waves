import { DonationModel } from "./DonationModel";

export interface DonationState {
    donations: DonationModel[];
    currentDonation: DonationModel | null;
}