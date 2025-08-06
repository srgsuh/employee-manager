import type {Employee, SearchObject} from "../model/dto-types.ts";

export interface Updater {
    id: string;
    fields: Partial<Employee>;
}

export interface QueryVariables<T> {
    queryKey: (string | Record<string, string>)[];
    queryFn: () => Promise<T>;
    staleTime: number;
}

export interface ApiClient {
    getAllQuery(searchObject?: SearchObject): QueryVariables<Employee[]>;
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee | null>;
    addEmployee(employee: Employee): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    updateEmployee(updater: Updater): Promise<Employee>;
}