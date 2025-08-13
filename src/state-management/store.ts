import {create} from "zustand";
import type {UserData} from "../services/AuthClient.ts";

export interface AuthData {
    isLoggedIn: boolean;
    userData: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

export const useAuthData = create<AuthData>(
    set => ({
        isLoggedIn: false,
        userData: null,
        login: (userData: UserData) => set({userData, isLoggedIn: true}),
        logout: () => set({userData: null, isLoggedIn: false}),
    })
);

export interface EmployeeFilter {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setSalaryFrom: (salaryFrom: number | null) => void;
    setSalaryTo: (salaryTo: number | null) => void;
    setAgeFrom: (ageFrom: number | null) => void;
    setAgeTo: (ageTo: number | null) => void;
}

const useEmployeeFilter = create<EmployeeFilter>(
    set => ({
        department: null,
        salaryFrom: null,
        salaryTo: null,
        ageFrom: null,
        ageTo: null,
        setDepartment: (department: string | null) => set({department}),
        setSalaryFrom: (salaryFrom: number | null) => set({salaryFrom}),
        setSalaryTo: (salaryTo: number | null) => set({salaryTo}),
        setAgeFrom: (ageFrom: number | null) => set({ageFrom}),
        setAgeTo: (ageTo: number | null) => set({ageTo}),
    })
);

export default useEmployeeFilter;