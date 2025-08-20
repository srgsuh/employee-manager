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
    name: string = "AuthenticationError";
    constructor(message: string, code: string = "AUTH_ERROR") {
        super(message, code, 401);
    }
}

export class AuthorizationError extends HttpError {
    name: string = "AuthorizationError";
    constructor(message: string, code: string = "AUTH_ERROR") {
        super(message, code, 403);
    }
}

export class NetworkError extends HttpError {
    name: string = "NetworkError";
    constructor(message: string, code?: string, status?: number) {
        super(message, code, status);
    }
}