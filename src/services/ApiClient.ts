import type {Employee, SearchObject} from "../model/dto-types.ts";

export interface ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
}