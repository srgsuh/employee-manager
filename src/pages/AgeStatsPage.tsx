import StatisticsPage from "./StatisticsPage.tsx";
import apiClient from "../services/ApiClientDB.ts";
import LineDiagram from "../components/LineDiagram.tsx";

const AgeStatsPage = () => {
    return (
        <StatisticsPage apiClient={apiClient} StatisticsDiagram={LineDiagram}></StatisticsPage>
    );
};

export default AgeStatsPage;