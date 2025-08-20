import ApiTransportAxios from "./ApiTransportAxios.ts";

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>;
    setToken(token: string | null): void;
}

export const apiTransport = new ApiTransportAxios();