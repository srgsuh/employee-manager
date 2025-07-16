import axios from 'axios';
import type {ApiClient} from "./ApiClient";
import apiConfig from "../../config/config.json";
import type {Employee, SearchObject} from "../model/dto-types.ts";

const apiInstance = axios.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    //timeout: 10_000,
    headers: {
        'Content-Type': 'application/json'
    }
});

class ApiClientAxios implements ApiClient {
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        if (searchObject) {
            return Promise.reject(new Error('Not implemented yet'));
        }
        return apiInstance.get('/employees')
            .then(response => response.data);
    }
}

const apiClient = new ApiClientAxios();

export default apiClient;
