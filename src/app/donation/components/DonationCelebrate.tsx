import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DonationModel } from '../models/DonationModel';

function DonationCelebrate() {
    const donations: DonationModel[] = useSelector((state: { donation: { donations: DonationModel[] } }) => state.donation.donations);

    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
      if (donations !== null) {
        console.log("The value of donations is not null :", donations);
        setDonationCount(donations.length);
      }
    }, [donations]);

    return (
        <div>Donation Celebrate {donationCount} Or {donations.length}</div>
    )
}

export default DonationCelebrate