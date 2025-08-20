export function isAdminRole(role: string | undefined): boolean {
    return !!role && role.toLowerCase() === 'admin';
}

export function extractName(email: string): string {
    return toTitleCase(email.split("@")[0]);
}

function toTitleCase(str: string): string {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}