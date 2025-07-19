import type {DiagramPoint} from "../model/types.ts";
import type {Employee} from "../model/dto-types.ts";
import _ from "lodash";
import StatisticsPage from "./StatisticsPage.tsx";
import apiClient from "../services/ApiClientDB.ts";
import LineDiagram from "../components/LineDiagram.tsx";
import {aggregateEmployee, salaryReducer} from "../components/utils/employee_agg.ts";


const aggFunc: (e: Employee[]) => DiagramPoint[] =
    (e) =>aggregateEmployee(e, salaryReducer, 10_000);

const SalaryStatsPage = () => {
    return (
        <StatisticsPage aggFunc={aggFunc}
        apiClient={apiClient}
        StatisticsDiagram={LineDiagram}
        xLabel={"Salary"}>

        </StatisticsPage>
    );
};

export default SalaryStatsPage;