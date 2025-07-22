import type {Employee} from "./dto-types.ts";

export interface SelectorItem {
    value: string;
    name: string;
    path: string;
}

export interface DiagramPoint {
    name: string;
    value: number;
}

export interface ColoredDiagramPoint extends DiagramPoint {
    color: string;
}

export interface DiagramProps {
    data: Employee[];
    aggFunc: (employees: Employee[]) => DiagramPoint[];
    xLabel?: string;
}