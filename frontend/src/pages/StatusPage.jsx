import { useLocation } from "react-router-dom";
import StatusCard from "../components/StatusCard";

export default function StatusPage() {
    const location = useLocation();
    const status = location.state?.status;

    const flow = location.state?.flow;

    // console.log("STATE:", location.state); 
    // Prevent direct access / refresh issue
    if (!status) {
        return <Navigate to="/otp" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c0f09] px-4">
            <StatusCard status={status} flow={flow} />
        </div>
    );
}