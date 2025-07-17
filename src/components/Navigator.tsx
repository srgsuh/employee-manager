import {Button, HStack} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.tsx";
import StatisticsSelector from "./StatisticsSelector.tsx";

const Navigator = () => {
    return (
        <HStack justify="space-between" p={2}>
            <Button variant="ghost" size="sm" minW={200} asChild>
                <RouterLink to = "/">
                Home
                </RouterLink>
            </Button>
            <Button variant="ghost" size="sm" minW={200} asChild>
                <RouterLink to = "/add">
                    Add employee
                </RouterLink>
            </Button>
            <StatisticsSelector>
            </StatisticsSelector>
            <ColorModeButton size={"md"}/>
        </HStack>
    );
};

export default Navigator;