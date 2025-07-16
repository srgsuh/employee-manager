import type {Employee, SearchObject} from "../model/dto-types.ts";

export interface ApiConfig {
    baseURL: string;
    timeout: number;
}

export interface ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
}