export interface LoginData {
    email: string;
    password: string;
}

export interface UserData {
    email: string;
    role: string;
    token: string;
}

export interface AuthClient {
    login(loginData: LoginData): Promise<UserData>;
    logout(): Promise<void>;
}