import type {AuthClient, UserData, LoginData} from "./AuthClient";
import {apiTransport} from "./ApiTransport.ts";

interface LoginResponse {
    accessToken: string;
    user: {
        email: string;
        id: string;
    };
}

class AuthClientJSONServer implements AuthClient {
    async login(loginData: LoginData): Promise<UserData> {
        const loginResponse = await apiTransport.post<LoginResponse>('/login', loginData);
        const {accessToken, user} = loginResponse;
        return {
            email: user.email,
            role: user.id,
            token: accessToken,
        }
    }

    async logout(): Promise<void> {}
}

const authClient = new AuthClientJSONServer();
export default authClient;