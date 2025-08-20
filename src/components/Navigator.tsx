import {Button, HStack, StackSeparator} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.tsx";
import StatisticsSelector from "./StatisticsSelector.tsx";
import type {FC} from "react";
import {useAuthData} from "../state-management/store.ts";
import {isAdminRole} from "../utils/roles-utils.ts";
import LogoutButton from "./LogoutButton.tsx";

const Navigator: FC = () => {
    const role = useAuthData(s=>s.userData?.role);
    const isAdmin = isAdminRole(role);

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
                <LogoutButton />
            </HStack>
            <ColorModeButton size={"md"}/>
        </HStack>
    );
};

export default Navigator;