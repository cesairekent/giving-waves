import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDonation, updateDonation } from "../DonationSlice";
import { useNavigate } from "react-router-dom";
import { DonationModel } from "../models/DonationModel";

function DonationForm() {
  const donation: DonationModel = useSelector((state: { donation: { currentDonation: DonationModel } }) => state.donation.currentDonation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [donor, setDonor] = useState("");
  const [donationType, setDonationType] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (donation !== null) {
      console.log("The value of donation is not null :", donation);
      setDonor(donation.donor);
      setDonationType(donation.donationType?.toLowerCase());
      setAmount(donation.amount);
    }
  }, [donation]);

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    donation
      ? dispatch(
          updateDonation({
            id: donation.id,
            updateDonation: { donor, donationType, amount },
          })
        )
      : dispatch(createDonation({ donor, donationType, amount }));
    cleanForm();
    navigate(-1);
    console.log({ donor, donationType, amount });
  };

  const cleanForm = () => {
    setDonor("");
    setDonationType("");
    setAmount(0);
  };

  return (
    <div>
      <h2>{donation ? "Modifier un Don" : "Enregistrer un Don"}</h2>
      <form id="donation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du Donateur"
          value={donor}
          onChange={(e) => setDonor(e.target.value)}
        />

        <select
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
        >
          <option value="" disabled hidden>
            Sélectionner le Type de Don
          </option>
          <option value="financier">Financier</option>
          <option value="materiel">Matériel</option>
        </select>

        <input
          type="number"
          placeholder="Montant ou Description"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default DonationForm;
