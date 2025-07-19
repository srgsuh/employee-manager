import type {DiagramPoint} from "../model/types.ts";
import type {Employee} from "../model/dto-types.ts";
import _ from "lodash";
import StatisticsPage from "./StatisticsPage.tsx";
import apiClient from "../services/ApiClientDB.ts";
import LineDiagram from "../components/LineDiagram.tsx";

const grouping = (v: number): string => {
    const index = 10_000;
    const vr = Math.floor(v/index)*index;
    return `${vr}-${vr + index}`;
};

const aggFunc: (e: Employee[]) => DiagramPoint[] = (employees) => {
    const salaries = employees.map(e=>e.salary);
    const gSalaries = _.countBy(salaries, grouping);
    const aggSalaries = Object.entries(gSalaries)
        .map(([k,v]:[string, number]) => ({name: k, value: v}));
    return _.sortBy(aggSalaries, ["name"]);
}

const SalaryStatsPage = () => {
    return (
        <StatisticsPage aggFunc={aggFunc}
        apiClient={apiClient}
        StatisticsDiagram={LineDiagram}>

        </StatisticsPage>
    );
};

export default SalaryStatsPage;