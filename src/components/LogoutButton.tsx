import {useAuthData} from "../state-management/store.ts";
import {extractName} from "../utils/roles-utils.ts";
import {Button} from "@chakra-ui/react";

const LogoutButton = () => {
    const email = useAuthData(s=>s.userData?.email);
    const logout = useAuthData(s=>s.logout);

    const userName = extractName(email || "");

    return (
        <Button variant="ghost" size="sm" minW={200} onClick = {logout}>
        Logout: {userName}
        </Button>
    );
};

export default LogoutButton;