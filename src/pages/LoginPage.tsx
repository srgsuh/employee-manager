import {useAuthData} from "../state-management/store.ts";
import type {LoginData} from "../services/AuthClient.ts";
import authClient from  "../services/AuthClientJSONServer.ts";
import LoginForm from "../components/LoginForm.tsx";
import {Flex, HStack, VStack} from "@chakra-ui/react";
import apiClient from "../services/ApiClientDB.ts";
import {useNavigate} from "react-router-dom";
import {Toaster, toaster} from "../components/ui/toaster"
import {AuthenticationError, NetworkError} from "../model/errors.ts";
import {ColorModeButton} from "../components/ui/color-mode.tsx";



const LoginPage = () => {
    const login = useAuthData((state) => state.login);
    const navigate = useNavigate();

    const submitter = async (loginData: LoginData): Promise<string> => {
        try {
            const userData = await authClient.login(loginData);
            login(userData);
            apiClient.setToken(userData.token);
            setTimeout(() => navigate("/", {replace: true}), 1350);

            toaster.create({
                description: "Login successful. Redirecting to home page...",
                closable: true,
                type: "success",
            });

            return "";
        } catch (e: unknown) {
            const errorMessage = getErrorMessage(e);
            toaster.create({
                description: `Login failed: ${errorMessage}`,
                closable: true,
                type: "error",
            });
            return errorMessage;
        }
    }
    
    return (
        <VStack w={"100%"} h={"100vh"}>
            <HStack justify={"flex-end"} p={2} w={"100%"}>
                <ColorModeButton />
            </HStack>
            <Flex flex="1" align="start" justify="center" w="100%">
                <LoginForm submitter={submitter}>
                </LoginForm>
                <Toaster />
            </Flex>
        </VStack>
    );
};

export default LoginPage;

function getErrorMessage(e: unknown): string {
    let errorMessage: string;
    if (e instanceof AuthenticationError) {
        errorMessage = "Wrong Credentials";
    }
    else if (e instanceof NetworkError) {
        errorMessage = "Server is unreachable. Try again later.";
    }
    else {
        errorMessage = `An unexpected error occurred: ${e instanceof Error? e.message: e}`;
    }
    return errorMessage;
}