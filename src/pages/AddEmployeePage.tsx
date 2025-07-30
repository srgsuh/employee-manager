import EmployeeEditForm from "../components/EmployeeEditForm.tsx";
import apiClient from "../services/ApiClientDB.ts";
import type {Employee} from "../model/dto-types.ts";

const AddEmployeePage = () => {
    return (
        <EmployeeEditForm affector={(e: Employee) => apiClient.addEmployee(e)}/>
    );
};

export default AddEmployeePage;