import type {ApiTransport} from "./ApiTransport.ts"
import axios, {type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from "axios";
import appConfig from "../config/config.ts";


export default class ApiTransportAxios implements ApiTransport {
    private _axios: AxiosInstance;
    private _token: string | null = null;
    private _logout: (() => void) | null = null;

    constructor() {
        this._axios = axios.create({
            baseURL: appConfig.db.baseURL,
            timeout: appConfig.db.timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this._axios.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            (error: AxiosError) => {
                console.error(`Axios error: ${JSON.stringify(error.toJSON())}`);
                if (error.response?.status === 401) {
                    this._logout?.();
                    this.setAuth(null, null);
                }
                return Promise.reject(error);
            }
        )
    }

    setAuth(token: string | null, logout: (() => void) | null): void {
        this._token = token;
        this._logout = logout;
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        return this._axios.get<T>(endpoint, parameters)
            .then(res => res.data);
    }

    async delete<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        return this._axios.delete(endpoint, parameters).then(res => res.data);
    }

    async post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        const body: string | undefined = this.buildBody(data);
        return this._axios.post<T>(endpoint, body, parameters)
            .then(res => res.data);
    }

    async patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const parameters = this.buildParameters(params);
        const body: string | undefined = this.buildBody(data);
        return this._axios.patch<T>(endpoint, body, parameters)
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