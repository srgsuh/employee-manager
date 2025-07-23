import EmployeeEditForm from "../components/EmployeeEditForm.tsx";

const AddEmployeePage = () => {
    return (
        <EmployeeEditForm submitter={console.log} employee={{
            fullName: "Ivan Drago",
            department: "IT",
            birthDate: "1990-01-01",
            salary: 100_000,
            avatar: "",
        }}/>
    );
};

export default AddEmployeePage;