import {useForm} from "react-hook-form";
import type {Employee} from "../model/dto-types.ts";
import {Box, Button, Field, HStack, Input} from "@chakra-ui/react";

interface FormValues {
    fullName: string;
}

interface EmployeeEditFormProps {
    submitter: (e: Employee) => void;
    employee?: Employee;
}

const createEmployee = (f: FormValues, old?: Employee): Employee => {
    return {
        fullName: f.fullName,
        department: "IT",
        birthDate: "1990-01-01",
        salary: 100_000,
        avatar: old?.avatar ?? "",
    }
}

const EmployeeEditForm = (
    {submitter, employee}: EmployeeEditFormProps
) => {
    const submitHandler = (fv: FormValues): void => {
        const e = createEmployee(fv, employee);
        return submitter(e);
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            fullName: employee?.fullName ?? ""
        }
    });
    return (
        <Box maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="lg">
            <form onSubmit={handleSubmit(submitHandler)}>
                <HStack>
                    <Field.Root invalid={!!errors.fullName}>
                        <Field.Label>First name</Field.Label>
                        <Input {...register("fullName")} variant="outline" />
                        <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
                    </Field.Root>
                </HStack>
                <HStack>
                    <Button colorScheme="teal" type="submit">Submit</Button>
                    <Button colorScheme="pink" type="reset">Reset</Button>
                </HStack>
            </form>
        </Box>
    );
};

export default EmployeeEditForm;