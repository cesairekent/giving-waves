import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanCurrentDonation } from "../DonationSlice";
import DonationListTable from "./DonationListTable";
import { Button } from "@/components/ui/button";

function DonationList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div>
                <h2 className="text-center text-2xl font-bold">Liste des Dons</h2>
            </div>
            <div className="flex space-x-4">
                <Button
                    className="text-white px-4 py-2 rounded"
                    onClick={() => {
                        dispatch(cleanCurrentDonation());
                        navigate("/donation-form");
                    }}
                >
                    Ajouter
                </Button>
                <Button
                    className="text-white px-4 py-2 rounded"
                    onClick={() =>
                        window.open('/donation-celebrate', '_blank', 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=600')
                    }
                >
                    Open Donation Celebrate
                </Button>
            </div>
            <DonationListTable />
        </div>
    );
}

export default DonationList;
