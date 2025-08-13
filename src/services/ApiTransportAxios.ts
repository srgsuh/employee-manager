import type {ApiTransport} from "./ApiTransport.ts"
import axios, {AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from "axios";
import appConfig from "../config/config.ts";
import {AuthenticationError, HttpError, NetworkError, TimeoutError} from "../model/errors.ts";
import {isErrorResponse} from "../model/ErrorResponse.ts";



function createHttpError(axiosError: AxiosError): HttpError {
    let error: HttpError;
    const message =
        isErrorResponse(axiosError.response?.data) ? axiosError.response?.data.error: axiosError.message;
    console.log("SERVER ERROR:", JSON.stringify(axiosError.response?.data, null, 2));
    if (axiosError.status === 401) {
        error = new AuthenticationError(message, axiosError.code);
    }
    else if (axiosError.code === "ERR_NETWORK") {
        error = new NetworkError(message, axiosError.code);
    }
    else if (axiosError.code === "ECONNABORTED") {
        error = new TimeoutError(message, axiosError.code);
    }
    else {
        error = new HttpError(message, axiosError.code, axiosError.status);
    }
    return error;
}

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
            (error: unknown) => {
                console.log("RECEIVED ERROR:", JSON.stringify(error, null, 2));
                if (error instanceof AxiosError) {
                    if (error.status === 401) {
                        this._logout?.();
                        this.setAuth(null, null);
                    }
                    return Promise.reject(createHttpError(error));
                }
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