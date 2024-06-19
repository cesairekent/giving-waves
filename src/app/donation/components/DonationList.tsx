import { useNavigate } from "react-router-dom";
import DonationItem from "./DonationItem";
import { useDispatch, useSelector } from "react-redux";
import { DonationModel } from "../models/DonationModel";
import { cleanCurrentDonation } from "../DonationSlice";

function DonationList() {
    const donations: DonationModel[] = useSelector((state: { donation: { donations: DonationModel[] } }) => state.donation.donations);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Liste des Dons</h2>
            <button onClick={() => {
                dispatch(cleanCurrentDonation());
                navigate("/donation-form");
            }}>Add</button>
            <button onClick={() => window.open('/donation-celebrate', '_blank', 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=600')}>Open Donation Celebrate</button>
            <ul>
                {donations.map((donation) => (
                    <DonationItem key={donation.id} donation={donation} />
                ))}
            </ul>
        </div>
    );
}

export default DonationList;