import {useAuthData} from "../state-management/store.ts";
import type {LoginData} from "../services/AuthClient.ts";
import authClient from  "../services/AuthClientJSONServer.ts";
import LoginForm from "../components/LoginForm.tsx";
import {HStack} from "@chakra-ui/react";
import apiClient from "../services/ApiClientDB.ts";
import {useNavigate} from "react-router-dom";
import {Toaster, toaster} from "../components/ui/toaster"
import {AuthenticationError, NetworkError, TimeoutError} from "../model/errors.ts";

const LoginPage = () => {
    const login = useAuthData((state) => state.login);
    const logout = useAuthData((state) => state.logout);

    const navigate = useNavigate();

    const submitter = async (loginData: LoginData): Promise<string> => {
        let errorMessage = "";
        try {
            const userData = await authClient.login(loginData);
            login(userData);
            apiClient.setAuth(userData.token, logout);

            setTimeout(() => {
                navigate("/", {replace: true});
            }, 1350);

            toaster.create({
                description: "Login successful. Redirecting to home page...",
                closable: true,
                type: "success",
            });
        }

        catch (e: unknown) {
            if (e instanceof AuthenticationError) {
                errorMessage = "Wrong Credentials";
            }
            else if (e instanceof NetworkError || e instanceof TimeoutError) {
                errorMessage = "Server is unreachable. Try again later.";
            }
            else {
                errorMessage = `An unexpected error occurred: ${e instanceof Error? e.message: e}`;
            }
            toaster.create({
                description: `Login failed: ${errorMessage}`,
                closable: true,
                type: "error",
            });
        }
        return errorMessage;
    }
    
    return (
        <HStack justify={"center"} align={"center"}>
            <LoginForm submitter={submitter}>
            </LoginForm>
            <Toaster />
        </HStack>
    );
};

export default LoginPage;