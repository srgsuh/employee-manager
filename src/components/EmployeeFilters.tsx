import {HStack} from "@chakra-ui/react";
import NumberFilter from "./NumberFilter.tsx";


const EmployeeFilters = () => {

    return (
        <HStack justify={"space-between"} p={2} borderBottom={"1px solid"}>
            <NumberFilter title={"Age"}/>
            <NumberFilter title={"Salary"}/>
        </HStack>
    );
};

export default EmployeeFilters;