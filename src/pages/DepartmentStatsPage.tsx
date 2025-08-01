import StatisticsPage from "./StatisticsPage.tsx";
import PieDiagram from "../components/PieDiagram.tsx";
import apiClient from "../services/ApiClientDB.ts";
import type {Employee} from "../model/dto-types.ts";
import type {DiagramPoint} from "../model/types.ts";
import _ from "lodash";

const aggFunc: (e: Employee[]) => DiagramPoint[] = (e) => {
    const groupData = _.countBy(e, (e) => e.department);
    return Object.entries(groupData).map(([k, v]:[string, number]) => {
        return {name: k, value: v};
    });
}

const DepartmentStatsPage = () => {
    return (
        <StatisticsPage aggFunc={aggFunc}
                        apiClient={apiClient}
                        StatisticsDiagram={PieDiagram}
                        xLabel={"Department"}>
        </StatisticsPage>
    );
};

export default DepartmentStatsPage;