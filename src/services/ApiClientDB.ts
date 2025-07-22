import type {ApiClient, ApiConfig, Updater} from "./ApiClient";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import ApiTransportAxios from "./ApiTransportAxios.ts";
import ApiTransportFetch from "./ApiTransportFetch.ts";
import apiConfigData from "../../config/config.json";

const apiConfig = apiConfigData as ApiConfig;

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>;
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

    getEmployee(id: string): Promise<Employee | null> {
        return this._apiTransport.get<Employee>(`/employees/${id}`);
    }

    deleteEmployee(id: string): Promise<Employee> {
        return this._apiTransport.delete<Employee>(`/employees/${id}`);
    }

    addEmployee(employee: Employee): Promise<Employee> {
        return this._apiTransport.post<Employee>('/employees', employee);
    }

    updateEmployee({id, fields}: Updater): Promise<Employee> {
        return this._apiTransport.patch<Employee>(`/employees/${id}`, fields);
    }
}

const apiTransportAxios = new ApiTransportAxios();
const apiTransportFetch = new ApiTransportFetch();
const apiClient = new ApiClientDB(
    apiConfig.transport === 'axios' ? apiTransportAxios : apiTransportFetch
);

export default apiClient;
