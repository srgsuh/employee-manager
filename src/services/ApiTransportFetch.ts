import apiConfigData from "../../config/config.json";
import type {ApiConfig} from "./ApiClient.ts";
import type {ApiTransport} from "./ApiClientDB.ts";

const apiConfig = apiConfigData as ApiConfig;
const baseUrl = apiConfig.baseURL;

function createUrl(endpoint: string, params?: Record<string, string>): string {
    const paramsStr = Object.entries(params || {})
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const paramsSuffix = paramsStr ? `?${paramsStr}` : "";
    return `${baseUrl}${endpoint}${paramsSuffix}`;
}

export default class ApiTransportFetch implements ApiTransport {
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async get<T>(endpoint: string, params?: Record<string, string> | undefined): Promise<T> {
        const url = createUrl(endpoint, params);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        });
        if (!response.ok) {
            return Promise.reject(
                new Error(`Network error: ${response.statusText}`)
            );
        }
        return response.json();
    }
}