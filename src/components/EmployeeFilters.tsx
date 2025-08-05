import {HStack} from "@chakra-ui/react";
import NumberFilter from "./NumberFilter.tsx";
import {minAge, maxAge, minSalary, maxSalary} from "../config/employees-config.json"
import useEmployeeFilter from "../state-management/store.tsx";

const EmployeeFilters = () => {
    const filter = useEmployeeFilter();
    const ageFrom = filter.ageFrom ?? minAge;
    const ageTo = filter.ageTo ?? maxAge;
    const salaryFrom = filter.salaryFrom ?? minSalary;
    const salaryTo = filter.salaryTo ?? maxSalary;

    const ageSetter = (ages: {from: number, to: number}) => {
        filter.setAgeFrom(ages.from);
        filter.setAgeTo(ages.to);
    }
    const salarySetter = (salaries: {from: number, to: number}) => {
        filter.setSalaryFrom(salaries.from);
        filter.setSalaryTo(salaries.to);
    }

    return (
        <HStack>
            <NumberFilter caption={"Age"}
                          from={ageFrom}
                          to={ageTo}
                          onSubmit={ageSetter}
            />
            <NumberFilter caption={"Salary"}
                          from={salaryFrom}
                          to={salaryTo}
                          onSubmit={salarySetter}
            />
        </HStack>
    );
};

export default EmployeeFilters;