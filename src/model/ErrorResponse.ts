export interface ErrorResponse { error: string }

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
    return !!obj && typeof obj === "object" && "error" in obj;
}