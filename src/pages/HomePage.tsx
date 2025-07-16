import EmployeeTable from "../components/EmployeeTable.tsx";
import apiClient from "../services/ApiClientAxios.ts";

const HomePage = () => {
    return (
        <EmployeeTable apiClient={apiClient}>
        </EmployeeTable>
    );
};

export default HomePage;