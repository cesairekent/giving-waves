import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();

    return (
        <>
            <h1>Giving Wave</h1>
            <button onClick={() => navigate("/donation")}>Start Donation</button>
        </>
    );
}

export default HomePage;