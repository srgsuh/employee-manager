import EmployeeEditForm from "../components/EmployeeEditForm.tsx";

const AddEmployeePage = () => {
    return (
        <EmployeeEditForm submitter={console.log} employee={{
            fullName: "Ivan Drago II",
            department: "IT",
            birthDate: "2009-09-09",
            salary: 99_900,
            avatar: "",
        }}/>
    );
};

export default AddEmployeePage;