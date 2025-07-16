import type {ApiClient, ApiConfig} from "./ApiClient";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import ApiTransportAxios from "./ApiTransportAxios.ts";
import ApiTransportFetch from "./ApiTransportFetch.ts";
import apiConfigData from "../../config/config.json";

const apiConfig = apiConfigData as ApiConfig;

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
}

class ApiClientDB implements ApiClient {
    _apiTransport: ApiTransport;

    constructor(apiTransport: ApiTransport) {
        this._apiTransport = apiTransport;
    }

    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        if (searchObject) {
            return Promise.reject(new Error('Not implemented yet'));
        }
        return this._apiTransport.get<Employee[]>('/employees');
    }
}

const apiTransportAxios = new ApiTransportAxios();
const apiTransportFetch = new ApiTransportFetch();
const apiClient = new ApiClientDB(
    apiConfig.transport === 'axios' ? apiTransportAxios : apiTransportFetch
);

export default apiClient;
