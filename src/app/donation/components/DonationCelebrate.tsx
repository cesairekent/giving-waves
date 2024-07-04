import { useEffect, useState } from 'react';
import { DonationModel } from '../models/DonationModel';
import DonorCard from './DonorCard';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';

function DonationCelebrate() {
  const [donationList, setDonationList] = useState<DonationModel[]>(() => {
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    return Array.isArray(savedDonations) ? savedDonations : [];
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

  const sortedDonationList = [...donationList].sort((a, b) => b.amount - a.amount);
  const lastDonation = donationList[donationList.length - 1];

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          Nouvelle donation
          <span className="text-xl font-semibold"> {lastDonation.donationType} </span>
          <div>
            de Mr./Mme
            <span className="text-2xl font-medium"> {lastDonation.donor} </span>
            d'une valeur de
          </div>
          <div>
            <span className="text-8xl font-bold animate-pulse text-yellow-600"> {lastDonation.amount} FCFA </span>
          </div>
        </div>
      </div>

      <Button
        className="absolute top-4 right-4 text-white p-2 rounded z-50"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        {isPanelOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </Button>

      <div
        className={`fixed top-10 right-0 h-full bg-white shadow-lg p-4 transform transition-transform w-1/5 duration-300 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="space-y-4 max-h-full w-full max-w-xs overflow-y-auto">
          {sortedDonationList.map((donation, index) => (
            <DonorCard key={index} amount={donation.amount} donor={donation.donor} donationIndex={index} donationType='' id={donation.id}/>
          ))}
        </div>
      </div>
    </div>
  );

}

export default DonationCelebrate;
