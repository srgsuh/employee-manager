import {Button, HStack, StackSeparator} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.tsx";
import StatisticsSelector from "./StatisticsSelector.tsx";
import type {FC} from "react";
import {useAuthData} from "../state-management/store.ts";
import {isAdminRole, extractName} from "../utils/roles-utils.ts";
import apiClient from "../services/ApiClientDB.ts";

const Navigator: FC = () => {
    const role = useAuthData(s=>s.userData?.role);
    const userName = useAuthData(s=>s.userData?.email);
    const logout = useAuthData(s=>s.logout);

    const isAdmin = isAdminRole(role);
    const name = extractName(userName);

    const logoutHandler = () => {
        logout();
        apiClient.setAuth(null, null);
    }

    return (
        <HStack p={2} separator={<StackSeparator />}>
            <HStack justify={"space-between"} w={"100%"}>
                <Button variant="ghost" size="sm" minW={200} asChild>
                    <RouterLink to = "/">
                    Home
                    </RouterLink>
                </Button>
                {isAdmin && <Button variant="ghost" size="sm" minW={200} asChild>
                    <RouterLink to="/add">
                        Add employee
                    </RouterLink>
                </Button>}
                <StatisticsSelector>
                </StatisticsSelector>
                <Button variant="ghost" size="sm" minW={200} onClick = {logoutHandler}>
                    Logout: {name}
                </Button>
            </HStack>
            <ColorModeButton size={"md"}/>
        </HStack>
    );
};

export default Navigator;