import Navigator from "../components/Navigator.tsx";
import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";


const Layout = () => {
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