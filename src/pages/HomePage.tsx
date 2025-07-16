import EmployeeTable from "../components/EmployeeTable.tsx";
import apiClient from "../services/ApiClientDB.ts";

const HomePage = () => {
    return (
        <EmployeeTable apiClient={apiClient}>
        </EmployeeTable>
    );
};

export default HomePage;