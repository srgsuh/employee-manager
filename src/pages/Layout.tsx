import Navigator from "../components/Navigator.tsx";
import {Box} from "@chakra-ui/react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuthData} from "../state-management/store.ts";

const Layout = () => {
    const isLoggedIn = useAuthData((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            <Navigator />
            <Box>
                <Outlet></Outlet>
            </Box>
        </>
    );
};

export default Layout;