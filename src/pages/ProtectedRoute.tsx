import {Navigate, Outlet} from "react-router-dom";
import {useAuthData} from "../state-management/store.ts";

const ProtectedRoute = () => {
    const isLoggedIn = useAuthData((state) => state.isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />;
};

export default ProtectedRoute;