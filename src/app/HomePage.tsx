import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();

    return (
        <div className="center-container">
            <h1>Giving Wave</h1>
            <Button onClick={() => navigate("/donation")}>Start Donation</Button>
        </div>
    );
}

export default HomePage;