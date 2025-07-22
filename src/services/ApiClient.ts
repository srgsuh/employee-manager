import type {Employee, SearchObject} from "../model/dto-types.ts";

export interface ApiConfig {
    baseURL: string;
    timeout: number;
    transport: "axios" | "fetch";
}

export interface Updater {
    id: string;
    fields: Partial<Employee>;
}

export interface ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee | null>;
    addEmployee(employee: Employee): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    updateEmployee(updater: Updater): Promise<Employee>;
}