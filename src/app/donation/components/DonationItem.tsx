// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { readDonation, deleteDonation } from "../DonationSlice";
import { DonationModel } from "../models/DonationModel";
import { useNavigate } from "react-router-dom";

function DonationItem({ donation }: { donation: DonationModel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li>
      {donation.donor} a fait un don {donation.donationType} : {donation.amount}
      <button onClick={() => dispatch(readDonation(donation.id))}>voir</button>
      <button onClick={() => {
        dispatch(readDonation(donation.id));
        navigate("/donation-form");
      }}>
        Editer
      </button>
      <button onClick={() => dispatch(deleteDonation(donation.id))}>
        Supprimer
      </button>
    </li>
  );
}

// DonationItem.propTypes = {
//   donation: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     donor: PropTypes.string.isRequired,
//     donationType: PropTypes.string.isRequired,
//     amount: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default DonationItem;
