import configData from './config.json';

interface AppConfig {
    db: {
        baseURL: string;
        timeout: number;
        transport: string;
    },
    query: {
        staleTime: number;
    },
    redirect: {
        timeout: number;
    }
}

const appConfig: AppConfig = configData;
export default appConfig;