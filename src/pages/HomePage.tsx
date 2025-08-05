import { VStack } from "@chakra-ui/react";
import EmployeeTable from "../components/EmployeeTable.tsx";
import apiClient from "../services/ApiClientDB.ts";
import EmployeeFilters from "../components/EmployeeFilters.tsx";

const HomePage = () => {
    return (
        <VStack>
            <EmployeeFilters></EmployeeFilters>
            <EmployeeTable apiClient={apiClient}></EmployeeTable>
        </VStack>
    );
};

export default HomePage;