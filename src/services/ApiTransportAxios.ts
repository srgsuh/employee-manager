import type {ApiTransport} from "./ApiClientDB.ts"
import axios, {type AxiosInstance, type AxiosRequestConfig} from "axios";
import apiConfigData from "../../config/config.json";
import type {ApiConfig} from "./ApiClient.ts";

const apiConfig = apiConfigData as ApiConfig;

export default class ApiTransportAxios implements ApiTransport {
    private _instance: AxiosInstance;

    constructor() {
        this._instance = axios.create({
            baseURL: apiConfig.baseURL,
            timeout: apiConfig.timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        return this._instance.get<T>(endpoint, parameters)
            .then(res => res.data);
    }

    async delete<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        return this._instance.delete(endpoint, parameters).then(res => res.data);
    }

    async post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        const body: string | undefined = this.buildBody(data);
        return this._instance.post<T>(endpoint, body, parameters)
            .then(res => res.data);
    }

    async patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        const body: string | undefined = this.buildBody(data);
        return this._instance.patch<T>(endpoint, body, parameters)
            .then(res => res.data);
    }

    private buildParameters(params?: Record<string, string>): AxiosRequestConfig | undefined {
        return params ? {params} : undefined;
    }

    private buildBody(body?: unknown): string | undefined {
        if (typeof body === "string") {
            return body;
        }
        return JSON.stringify(body);
    }
}