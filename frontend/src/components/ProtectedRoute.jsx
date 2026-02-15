import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/UseAuthStore";

const ProtectedRoute = ({ children }) => {
    const { authUser, isChecking } = useAuthStore();

    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
