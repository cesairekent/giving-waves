import { useEffect, useState } from 'react';
import { DonationModel } from '../models/DonationModel';

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

  return (
    <div>Donation Celebrate {donationList.length}</div>
  );
}

export default DonationCelebrate;
