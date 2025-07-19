import StatisticsPage from "./StatisticsPage.tsx";
import apiClient from "../services/ApiClientDB.ts";
import LineDiagram from "../components/LineDiagram.tsx";
import type {Employee} from "../model/dto-types.ts";
import type {DiagramPoint} from "../model/types.ts";
import {getAgeFromDate} from "../components/utils/math.ts";
import _ from "lodash";

const groupingFunction = (v: number): string => {
    const vr = Math.floor(v/10)*10;
    return `${vr} - ${vr + 10}`;
};

const aggFunc:(e: Employee[]) => DiagramPoint[] = (employees) => {
    const ageData = employees.map(e => getAgeFromDate(e.birthDate));
    const groupData = _.countBy(ageData, groupingFunction);
   return  _.sortBy(
        Object.entries(groupData).map(
            ([k, v]) => ({name: k, value: v})
        ), ["name"]
    );
};

const AgeStatsPage = () => {
    return (
        <StatisticsPage aggFunc = {aggFunc} apiClient={apiClient} StatisticsDiagram={LineDiagram}></StatisticsPage>
    );
};

export default AgeStatsPage;