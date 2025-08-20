import {create} from "zustand";
import type {UserData} from "../services/AuthClient.ts";
import {pageSize} from "../config/employees-config.json";

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

export interface PageState {
    page: number;
    itemCount: number;
    setPage: (page: number) => void;
    setItemCount: (maxPage: number) => void;
}

export const usePageState = create<PageState>(
    set => ({
        page: 1,
        itemCount: 0,
        setPage: (page: number) => set({page}),
        setItemCount: (itemCount: number) => set(s => ({itemCount, page: pageValue(s.page, itemCount)})),
    })
);

function pageValue(page: number, count: number): number {
    return (count > 0)? Math.min(page, Math.ceil(count / pageSize)): 1;
}

export default useEmployeeFilter;