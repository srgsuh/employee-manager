import { VStack } from "@chakra-ui/react";
import EmployeeTable from "../components/EmployeeTable.tsx";
import apiClient from "../services/ApiClientDB.ts";
import EmployeeFilters from "../components/EmployeeFilters.tsx";
import {useAuthData} from "../state-management/store.ts";

const HomePage = () => {
    const data = useAuthData((state) => state.userData);
    console.log(`USER DATA: ${JSON.stringify(data)}`);
    return (
        <VStack>
            <EmployeeFilters></EmployeeFilters>
            <EmployeeTable apiClient={apiClient}></EmployeeTable>
        </VStack>
    );
};

export default HomePage;