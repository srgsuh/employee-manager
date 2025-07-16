import type {ApiClient} from "./ApiClient";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import ApiTransportAxios from "./ApiTransportAxios.ts";

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string> | undefined): Promise<T>;
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
const apiClient = new ApiClientDB(apiTransportAxios);

export default apiClient;
