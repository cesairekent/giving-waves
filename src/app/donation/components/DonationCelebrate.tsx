import { useEffect, useState } from 'react';
import { DonationModel } from '../models/DonationModel';
import DonorCard from './DonorCard';

function DonationCelebrate() {
  const [donationList, setDonationList] = useState<DonationModel[]>(() => {
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    return Array.isArray(savedDonations) ? savedDonations : [];
  });

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'donations') {
        const newDonations = JSON.parse(event.newValue || '[]');
        if (Array.isArray(newDonations)) {
          setDonationList(newDonations);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('donations', JSON.stringify(donationList));
  // }, [donationList]);

  const sortedDonationList = [...donationList].sort((a, b) => b.amount - a.amount);

  return (
    <div className="h-screen w-screen flex flex-col">
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">Donation Celebrate {donationList.length}</div>
    </div>
    <div className="flex justify-end items-end h-2/3 overflow-y-auto p-4">
        <div className="space-y-4 max-h-full w-full max-w-xs">
          {sortedDonationList.map((donation, index) => (
            <DonorCard key={index} {...donation} />
          ))}
        </div>
      </div>
  </div>
  );
}

export default DonationCelebrate;
