import {useAuthData} from "../state-management/store.ts";
import type {LoginData} from "../services/AuthClient.ts";
import authClient from  "../services/AuthClientJSONServer.ts";
import LoginForm from "../components/LoginForm.tsx";
import {HStack} from "@chakra-ui/react";
import apiClient from "../services/ApiClientDB.ts";
import {useNavigate} from "react-router-dom";
import {Toaster, toaster} from "../components/ui/toaster"
import {Axios, AxiosError} from "axios";

const LoginPage = () => {
    const login = useAuthData((state) => state.login);
    const logout = useAuthData((state) => state.logout);

    const navigate = useNavigate();

    const submitter = async (loginData: LoginData)=> {
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
            return true;
        }
        //TODO Prettify error - make several cases
        catch (e: unknown) {
            const message = (e instanceof AxiosError)?
                `AXIOS ERROR: ${e.message}, code: ${e.code}` : `${e}`;
            //const message = (e instanceof Error)? e.message: `${e}`;
            toaster.create({
                description: `Login failed: ${message}`,
                closable: true,
                type: "error",
            });
        }
        return false;
    }
    // if (isLoggedIn) {
    //     return <Navigate to="/" replace />;
    // }
    return (
        <HStack justify={"center"} align={"center"}>
            <LoginForm submitter={submitter}>
            </LoginForm>
            <Toaster />
        </HStack>
    );
};

export default LoginPage;