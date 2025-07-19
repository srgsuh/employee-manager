import type {Employee} from "./dto-types.ts";

export interface SelectorItem {
    value: string;
    name: string;
}

export interface DiagramProps {
    data: Employee[];
}