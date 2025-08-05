import StatisticsPage from "./StatisticsPage.tsx";
import apiClient from "../services/ApiClientDB.ts";
import type {Employee} from "../model/dto-types.ts";
import type {DiagramPoint} from "../model/types.ts";
import LineDiagram from "../components/LineDiagram.tsx";
import {ageReducer, aggregateEmployee} from "../utils/employee_agg.ts";

const aggFunc:(e: Employee[]) => DiagramPoint[] = (employees) =>
    aggregateEmployee(employees, ageReducer, 10);

const AgeStatsPage = () => {
    return (
        <StatisticsPage aggFunc = {aggFunc}
                        apiClient={apiClient}
                        StatisticsDiagram={LineDiagram}
                        xLabel={"Age"}>
        </StatisticsPage>
    );
};

export default AgeStatsPage;