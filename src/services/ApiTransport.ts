import appConfig from "../config/config.ts";
import ApiTransportAxios from "./ApiTransportAxios.ts";
import ApiTransportFetch from "./ApiTransportFetch.ts";

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>;
}

export const apiTransport = appConfig.db.transport === 'axios' ?
    new ApiTransportAxios():
    new ApiTransportFetch();