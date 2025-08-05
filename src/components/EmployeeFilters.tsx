import {HStack} from "@chakra-ui/react";
import NumberFilter from "./NumberFilter.tsx";
import DepartmentSelector from "./DepartmentSelector.tsx";


const EmployeeFilters = () => {

    return (
        <HStack justify={"space-around"} p={2}>
            <DepartmentSelector></DepartmentSelector>
            <NumberFilter title={"Age"}/>
            <NumberFilter title={"Salary"}/>
        </HStack>
    );
};

export default EmployeeFilters;