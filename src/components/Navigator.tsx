import {HStack} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.tsx";

const Navigator = () => {
    return (
        <HStack justify="space-between" p={2}>
            <RouterLink to = "/">
                Home
            </RouterLink>
            <RouterLink to = "/add">
                Add employee
            </RouterLink>
            <RouterLink to = "/stats">
                Statistics
            </RouterLink>
            <ColorModeButton />
        </HStack>
    );
};

export default Navigator;