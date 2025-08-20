import {useAuthData} from "../state-management/store.ts";
import type {LoginData} from "../services/AuthClient.ts";
import authClient from  "../services/AuthClientJSONServer.ts";
import LoginForm from "../components/LoginForm.tsx";
import {Flex, HStack, VStack} from "@chakra-ui/react";
import apiClient from "../services/ApiClientDB.ts";
import {useNavigate} from "react-router-dom";
import {Toaster, toaster} from "../components/ui/toaster"
import {ColorModeButton} from "../components/ui/color-mode.tsx";
import config from "../config/config.ts";
import {useEffect, useState} from "react";

const redirectTimeOut = config.redirect.timeout;

const showToaster = () => {
    toaster.create({
        description: "Login successful. Redirecting to home page...",
        closable: true,
        type: "success",
    });
}

const LoginPage = () => {
    const login = useAuthData((state) => state.login);
    const [startRedirect, setStartRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (startRedirect) {
            timer = setTimeout(() => {
                navigate("/", {replace: true});
            }, redirectTimeOut);
        }
        return () => { if (timer) clearTimeout(timer); }
    }, [startRedirect, navigate])

    const submitter = async (loginData: LoginData): Promise<void> => {
        const userData = await authClient.login(loginData);
        login(userData);
        apiClient.setToken(userData.token);
        setStartRedirect(true);
        showToaster();
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