export interface DonationModel {
  id: number;
  donor: string;
  donationType: string;
  amount: number;
}

export interface DonationItemProps {
  donation: DonationModel;
}