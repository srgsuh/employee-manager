import {Navigate, NavLink, useRouteError} from "react-router-dom";
import {useAuthData} from "../state-management/store.ts";
import {AuthenticationError} from "../model/errors.ts";
import {Button, Spinner, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import appConfig from "../config/config.ts";

const redirectTimeOut = appConfig.redirect.timeout;

const ErrorPage = () => {
    const error = useRouteError();
    const logout = useAuthData(s => s.logout);
    const [doRedirect, setDoRedirect] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (error instanceof AuthenticationError) {
            timer = setTimeout(() => {
                logout();
                setDoRedirect(true);
            }, redirectTimeOut);
        }
        return () => { if (timer) clearTimeout(timer); }
    }, [error, logout]);

    if (doRedirect) {
        return <Navigate to={"/login"} replace></Navigate>
    }

    const errorMessage = error instanceof Error? error.message: `${error}`;
    const isLoggingOut = error instanceof AuthenticationError;

    return (
        <VStack w={"100%"} h={"100%"} justify={"center"} align={"center"}>
            <Text color = "red" fontSize = "2xl" textAlign = "center" p = {2}>
                {errorMessage}
            </Text>
            <>
                {   isLoggingOut ?
                    <VStack colorPalette="teal">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Redirecting to login page...</Text>
                    </VStack> :
                    <Button asChild colorPalette="teal">
                        <NavLink to={"/"}>
                            To Home page
                        </NavLink>
                    </Button>
                }
            </>

        </VStack>
    );
};

export default ErrorPage;