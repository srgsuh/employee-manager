import {Box, Button, HStack, Text} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";
import {ColorModeButton} from "./ui/color-mode.tsx";
import StatisticsSelector from "./StatisticsSelector.tsx";
import type {FC} from "react";

interface Props {
    logout: () => void;
    userName?: string;
}

function takeName(email: string): string {
    return email.split("@")[0];
}

const Navigator: FC<Props> = ({logout, userName}) => {
    const name = userName? takeName(userName): "Stranger";
    return (
        <HStack justify="space-between" p={2}>
            <Box>
                <Text>Welcome: {name}</Text>
            </Box>
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
            <Button variant="ghost" size="sm" minW={200} onClick = {logout}>
                Logout
            </Button>
            <ColorModeButton size={"md"}/>
        </HStack>
    );
};

export default Navigator;