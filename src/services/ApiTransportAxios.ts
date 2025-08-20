import type {ApiTransport} from "./ApiTransport.ts"
import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, isAxiosError} from "axios";
import appConfig from "../config/config.ts";
import {AuthenticationError, AuthorizationError, HttpError, NetworkError} from "../model/errors.ts";
import {isErrorResponse} from "../model/ErrorResponse.ts";

function createHttpError(error: unknown): HttpError {
    let httpError: HttpError | undefined = undefined;
    if (isAxiosError(error)) {
        const response = error.response?.data || error.message;
        const message = isErrorResponse(response) ? response.error : `${response}`;

        if (error.status === 401) {
            httpError = new AuthenticationError(message, error.code);
        } else if (error.status === 403) {
            httpError = new AuthorizationError(message, error.code);
        } else if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
            httpError = new NetworkError("Server is unavailable. Try again later", error.code);
        }
        else {
            httpError = new HttpError(message, error.code, error.status);
        }
    }
    return httpError ?? new HttpError(error instanceof Error? error.message: `${error}`);
}

export default class ApiTransportAxios implements ApiTransport {
    private _axios: AxiosInstance;
    private _token: string | null = null;

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
                return Promise.reject(createHttpError(error));
            }
        );
    }

    setToken(token: string | null): void {
        this._token = token;
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