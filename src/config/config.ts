import configData from './config.json';

interface AppConfig {
    db: {
        baseURL: string;
        timeout: number;
        transport: string;
    },
    query: {
        staleTime: number;
    }
}

const appConfig: AppConfig = configData;
export default appConfig;