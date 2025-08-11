import {useAuthData} from "../state-management/store.ts";
import type {LoginData} from "../services/AuthClient.ts";
import authClient from  "../services/AuthClientJSONServer.ts";
import LoginForm from "../components/LoginForm.tsx";
import {HStack} from "@chakra-ui/react";
import apiClient from "../services/ApiClientDB.ts";

const LoginPage = () => {
    const login = useAuthData((state) => state.login);
    const submitter = async (loginData: LoginData)=> {
        try {
            const userData = await authClient.login(loginData);
            login(userData);
            apiClient.setToken(userData.token);
            return true;
        }
        catch (e) {
            console.error(e);
        }
        return false;
    }
    return (
        <HStack justify={"center"} align={"center"}>
            <LoginForm submitter={submitter}>
            </LoginForm>
        </HStack>
    );
};

export default LoginPage;