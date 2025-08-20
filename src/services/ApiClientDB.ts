import type {ApiClient, Updater} from "./ApiClient";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import {apiTransport} from "./ApiTransport.ts";
import {getBirthDateFromAge} from "../utils/math.ts";
import type {ApiTransport} from "./ApiTransport.ts";
import _ from "lodash";

class ApiClientDB implements ApiClient {
    _apiTransport: ApiTransport;

    setToken(token: string | null): void {
        this._apiTransport.setToken(token);
    }

    constructor(apiTransport: ApiTransport) {
        console.log(`ApiClientDB construct using transport: ${apiTransport?.constructor?.name}`);
        this._apiTransport = apiTransport;
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
        return this._apiTransport.post<Employee>('/employees', {...employee, userId: "ADMIN"});
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

export default new ApiClientDB(apiTransport);
