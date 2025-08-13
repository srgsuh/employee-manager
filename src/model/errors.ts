export class HttpError extends Error {
    name: string = "HttpError";
    code: string | undefined;
    status: number | undefined;
    constructor(message: string, code: string = "HTTP_ERROR", status?: number) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

export class AuthenticationError extends HttpError {
    name: string = "AuthError";
    constructor(message: string, code: string = "AUTH_ERROR") {
        super(message, code, 401);
    }
}

export class NetworkError extends HttpError {
    name: string = "NetworkError";
    constructor(message: string, code?: string, status?: number) {
        super(message, code, status);
    }
}

export class TimeoutError extends HttpError {
    name: string = "TimeoutError";
    constructor(message: string, code?: string, status?: number) {
        super(message, code, status);
    }
}