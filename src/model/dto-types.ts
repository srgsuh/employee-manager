export interface Employee {
    id?: string;
    fullName: string;
    avatar: string;
    department: string;
    birthDate: string;
    salary: number;
    userId?: string;
}

export interface SearchObject {
    department?: string;
    salaryFrom?: number;
    salaryTo?: number;
    ageFrom?: number;
    ageTo?: number;
}