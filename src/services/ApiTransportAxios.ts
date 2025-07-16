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
        const parameters: AxiosRequestConfig | undefined = params ? {params} : undefined;
        return this._instance.get<T>(endpoint, parameters).then(res => res.data);
    }
}