import Navigator from "../components/Navigator.tsx";
import {Box} from "@chakra-ui/react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuthData} from "../state-management/store.ts";
import apiClient from "../services/ApiClientDB.ts";

const Layout = () => {
    const isLoggedIn = useAuthData((state) => state.isLoggedIn);
    const userData = useAuthData(s => s.userData);
    const logout = useAuthData((state) => state.logout);

    const logoutHandler = () => {
        logout();
        apiClient.setAuth(null, null);
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            <Navigator userName={userData?.email} logout={logoutHandler} />
            <Box>
                <Outlet></Outlet>
            </Box>
        </>
    );
};

export default Layout;