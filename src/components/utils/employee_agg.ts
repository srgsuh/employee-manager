import _ from "lodash";
import type {Employee} from "../../model/dto-types.ts";
import type {DiagramPoint} from "../../model/types.ts";
import {getAgeFromDate} from "./math.ts";

type EmployeeReducer = (e: Employee) => number;

export const salaryReducer: EmployeeReducer = (e) => e.salary;
export const ageReducer: EmployeeReducer = (e) => getAgeFromDate(e.birthDate);

interface Grouping{
    [index: string]: number
}

export function rangeGrouping(array: number[], step: number): Grouping {
    const minimal = _.min(array) ?? 0;
    const group = (n: number): string => {
        const norm = Math.floor(n / step) * step;
        const lBound = Math.max(minimal, norm);
        const rBound = norm + step;
        return `${lBound}-${rBound}`;
    }

    return _.countBy(array, (n) => group(n));
}

export function aggregateEmployee(
                            Employees: Employee[],
                            reducer: EmployeeReducer,
                            groupingStep: number): DiagramPoint[]
{
    const numbers = Employees.map(reducer);
    numbers.sort((a, b) => a - b);
    const groupData = rangeGrouping(numbers, groupingStep);
    return Object.entries(groupData).map(([k, v]:[string, number]) => {
        return {name: k, value: v};
    });

}