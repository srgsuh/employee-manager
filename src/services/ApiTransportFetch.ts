import type {ApiTransport} from "./ApiClientDB.ts";
import appConfig from "../config/config.ts";

const baseUrl = appConfig.db.baseURL;
const timeout = appConfig.db.timeout;

function createUrl(endpoint: string, params?: Record<string, string>): string {
    const paramsStr = Object.entries(params || {})
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const paramsSuffix = paramsStr ? `?${paramsStr}` : "";
    return `${baseUrl}${endpoint}${paramsSuffix}`;
}

interface RequestData {
    method?: string;
    headers?: Headers;
    body?: string;
}

const BASE_REQUEST = {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json;charset=UTF-8'}),
};

export default class ApiTransportFetch implements ApiTransport {
    patch<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const url = createUrl(endpoint, params);
        const addRequest = {
            method: 'PATCH',
            body: this.buildBody(data)
        };
        return this.connect<T>(url, addRequest);
    }
    delete<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = createUrl(endpoint, params);
        const addRequest = {
            method: 'DELETE',
        };
        return this.connect<T>(url, addRequest);
    }
    post<T>(endpoint: string, data: unknown, params?: Record<string, string>): Promise<T> {
        const url = createUrl(endpoint, params);
        const addRequest = {
            method: 'POST',
            body: this.buildBody(data)
        };
        return this.connect<T>(url, addRequest);
    }
    async get<T>(endpoint: string, params?: Record<string, string> | undefined): Promise<T> {
        const url = createUrl(endpoint, params);
        return this.connect<T>(url);
    }

    private async connect<T>(url: string, addRequest: RequestData = {}): Promise<T> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const signal = {signal: controller.signal};
            const request = {...signal, ...BASE_REQUEST, ...addRequest};

            const response = await fetch(url, request);
            if (!response.ok) {
                return Promise.reject(`Network error: server responded with: ${response.statusText} (status: ${response.status})`)
            }
            return response.json();
        }
        catch (e) {
            console.log(`ApiTransportFetch connect ERROR: ${e}`);
            if (e instanceof Error && e.name === 'AbortError') {
                return Promise.reject(`Server timeout reached. Try again later.`)
            }
            if (e instanceof Error) {
                return Promise.reject(`Network error: ${e.message}`);
            }
            return Promise.reject(e);
        }
        finally {
            clearTimeout(id);
        }
    }

    private buildBody(body: unknown): string {
        if (typeof body === "string") {
            return body;
        }
        return JSON.stringify(body);
    }
}