export function isAdminRole(role: string | undefined): boolean {
    return !!role && role.toLowerCase() === 'admin';
}

export function extractName(email?: string): string {
    return !!email && email.split("@")[0] || "Anonymous";
}