export interface DonationModel {
  id: number;
  donor: string;
  donationType: string;
  amount: number;
  description?: string;
}

export interface DonationItemProps {
  donation: DonationModel;
}