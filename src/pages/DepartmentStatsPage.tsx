import StatisticsPage from "./StatisticsPage.tsx";
import PieDiagram from "../components/PieDiagram.tsx";
import apiClient from "../services/ApiClientDB.ts";

const DepartmentStatsPage = () => {

    return (
        <StatisticsPage apiClient={apiClient} StatisticsDiagram={PieDiagram}></StatisticsPage>
    );
};

export default DepartmentStatsPage;