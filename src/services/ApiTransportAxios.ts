import type {ApiTransport} from "./ApiTransport.ts"
import axios, {type AxiosInstance, type AxiosRequestConfig} from "axios";
import appConfig from "../config/config.ts";


export default class ApiTransportAxios implements ApiTransport {
    private _instance: AxiosInstance;
    private _token: string | undefined;

    constructor() {
        this._instance = axios.create({
            baseURL: appConfig.db.baseURL,
            timeout: appConfig.db.timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    setToken(token: string): void {
        this._token = token;
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
        if (this._token) {
            const token = this._token;
            return params ? {params, headers: {Authorization: `Bearer ${token}`}} : {headers: {Authorization: `Bearer ${token}`}};
        }
        return params ? {params} : undefined;
    }

    private buildBody(body?: unknown): string | undefined {
        if (typeof body === "string") {
            return body;
        }
        return JSON.stringify(body);
    }
}