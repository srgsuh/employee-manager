import EmployeeEditForm from "../components/EmployeeEditForm.tsx";

const AddEmployeePage = () => {
    return (
        <EmployeeEditForm submitter={console.log} employee={{
            fullName: "Ivan Drago II",
            department: "Finance",
            birthDate: "1999-09-09",
            salary: 9_900,
            avatar: "",
        }}/>
    );
};

export default AddEmployeePage;