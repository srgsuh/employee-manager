import type {ApiClient, QueryVariables, Updater} from "./ApiClient";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import ApiTransportAxios from "./ApiTransportAxios.ts";
import ApiTransportFetch from "./ApiTransportFetch.ts";
import appConfig from "../config/config.ts";
import {getBirthDateFromAge} from "../utils/math.ts";
import _ from "lodash";

export interface ApiTransport {
    get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T>;
}

class ApiClientDB implements ApiClient {
    _apiTransport: ApiTransport;

    constructor(apiTransport: ApiTransport) {
        console.log(`ApiClientDB construct using transport: ${apiTransport?.constructor?.name}`);
        this._apiTransport = apiTransport;
    }

    getAllQuery(searchObject?: SearchObject): QueryVariables<Employee[]> {
        const staleTime = appConfig.query.staleTime;
        const params = this._searchObjectToParams(searchObject);
        const queryFn = async () => this._getAll(params);
        const queryKey = params? ["/employees", params]: ["/employees"];

        return {queryFn, queryKey, staleTime};
    }

    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const params = this._searchObjectToParams(searchObject);
        return this._getAll(params);
    }

    async _getAll(params?: Record<string, string>): Promise<Employee[]> {
        return this._apiTransport.get<Employee[]>('/employees', params);
    }

    getEmployee(id: string): Promise<Employee | null> {
        return this._apiTransport.get<Employee>(`/employees/${id}`);
    }

    deleteEmployee(id: string): Promise<Employee> {
        console.log(`ApiClientDB construct using transport: ${this._apiTransport?.constructor?.name}`);
        return this._apiTransport.delete<Employee>(`/employees/${id}`);
    }

    addEmployee(employee: Employee): Promise<Employee> {
        return this._apiTransport.post<Employee>('/employees', employee);
    }

    updateEmployee({id, fields}: Updater): Promise<Employee> {
        return this._apiTransport.patch<Employee>(`/employees/${id}`, fields);
    }

    _searchObjectToParams(searchObject?: SearchObject): Record<string, string> | undefined {
        if (!searchObject || _.isEmpty(searchObject)) {
            return undefined;
        }
        const {department, salaryFrom, salaryTo, ageFrom, ageTo} = searchObject;

        return {
            ...(department && {department}),
            ...(salaryFrom && {salary_gte: salaryFrom.toString()}),
            ...(salaryTo && {salary_lte: salaryTo.toString()}),
            ...(ageFrom && {birthDate_lte: getBirthDateFromAge(ageFrom)}),
            ...(ageTo && {birthDate_gte: getBirthDateFromAge(ageTo)})
        }
    }
}

const apiClient = new ApiClientDB(
    appConfig.db.transport === 'axios' ? new ApiTransportAxios() :  new ApiTransportFetch()
);

export default apiClient;
