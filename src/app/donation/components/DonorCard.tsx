import React from 'react';
import { DonationModel } from '../models/DonationModel';

interface DonorCardProps extends DonationModel {
  color?: string; // Optional color prop with a default value
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const DonorCard: React.FC<DonorCardProps> = ({ amount, donor, color = 'bg-yellow-400' }) => {
  return (
    <div className="flex items-center space-x-4 border overflow-hidden rounded-lg max-w-[300px]">
      <div className={`w-3 h-20 ${color}`} style={{ minHeight: '100%' }}/>
      <div className="flex-1 space-y-1 p-2 pl-0">
        <div className="flex items-center">
          <p className="text-2xl font-semibold leading-none">{formatCurrency(amount).replace('FCFA', '')}</p>
          <p className="text-sm font-semibold leading-none">Xaf</p>
        </div>
        <p className="text-sm text-muted-foreground">{donor}</p>
      </div>
    </div>
  );
};

export default DonorCard;
