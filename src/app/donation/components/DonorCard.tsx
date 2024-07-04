import React from 'react';
import { DonationModel } from '../models/DonationModel';

interface DonorCardProps extends DonationModel {
  donationIndex?: number; // Optional color prop with a default value
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const DonorCard: React.FC<DonorCardProps> = ({ amount, donor, donationIndex}) =>
{
  const color = donationIndex === 0 ? 'yellow-400' : donationIndex === 1 ? 'gray-500' : donationIndex === 2 ? 'yellow-700' : 'black';

  return (
    <div className={`flex items-center space-x-4 border border-${color} overflow-hidden rounded-lg max-w-[350px]`}>
      <div className={`w-5 h-20 bg-${color}`} style={{ minHeight: '100%' }}/>
      <div className="flex-1 space-y-1 p-2 pl-0">
        <div className="flex items-center">
        <p className="text-2xl font-semibold leading-none">{formatCurrency(amount).replace('FCFA', '')}</p>
        <span className="text-sm font-semibold leading-none">Xaf</span>
        </div>
        <p className="text-sm text-muted-foreground">{donor}</p>
      </div>
    </div>
  );
};

export default DonorCard;
