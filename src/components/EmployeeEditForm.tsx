import {Controller, useForm} from "react-hook-form";
import type {Employee} from "../model/dto-types.ts";
import {
    Box,
    Button,
    createListCollection,
    Field,
    HStack,
    Input,
    Portal,
    Select
} from "@chakra-ui/react";
import {getAgeFromDate} from "./utils/math.ts";

interface EmployeeEditFormProps {
    submitter: (e: Employee) => void;
    employee?: Employee;
}

const depItems: {label: string, value: string}[] = [
    {label: "IT", value: "IT"},
    {label: "QA", value: "QA"},
    {label: "HR", value: "HR"},
    {label: "Sales", value: "Sales"},
    {label: "Finance", value: "Finance"},
]

const EmployeeEditForm = (
    {submitter, employee}: EmployeeEditFormProps
) => {
    const submitHandler = submitter;
    const { register, handleSubmit, formState: { errors }, control } = useForm<Employee>({
        defaultValues: {
            fullName: employee?.fullName || undefined,
            birthDate: employee?.birthDate || undefined,
            salary: employee?.salary || undefined,
            department: employee?.department || undefined
        }
    });
    const departments = createListCollection({items: depItems});
    return (
        <Box maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="lg">
            <form onSubmit={handleSubmit(submitHandler)}>
                <Field.Root invalid={!!errors.fullName} width="320px" >
                    <Field.Label>First name</Field.Label>
                    <Input {...register("fullName", {
                        required: {value: true, message: "Full name is required"},
                        minLength: {value: 5, message: "Full name must be at least 5 characters long"}})}
                           variant="outline"
                           css={{ "--focus-color": "blue" }}/>
                    <Field.ErrorText>{errors?.fullName?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.department} width="320px">
                    <Field.Label>
                        Department
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                        rules={{ required: {value: true, message: "Department is required"} }}
                        control={control}
                        name="department"
                        render={({ field }) => (
                            <Select.Root
                                name={field.name}
                                value={field.value ? [field.value] : []}
                                onValueChange={({ value }) => {
                                    const selected = Array.isArray(value) ? value[0] : '';
                                    field.onChange(selected);
                                }}
                                onInteractOutside={() => field.onBlur()}
                                collection={departments}
                            >
                                <Select.HiddenSelect />
                                <Select.Control focusRingColor="blue">
                                    <Select.Trigger focusRingColor="blue">
                                        <Select.ValueText placeholder="Select department" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {departments.items.map((dep) => (
                                                <Select.Item item={dep} key={dep.value}>
                                                    {dep.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        )}
                    />
                    <Field.ErrorText>{errors.department?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.birthDate} width="320px">
                    <Field.Label>
                        Birthdate
                    </Field.Label>
                    <Input {...register("birthDate", {
                        required: {value: true, message: "Birthdate is required"},
                                validate: (date) => {
                                    return getAgeFromDate(date) < 18? "Employee's age must be greater then 18": undefined;
                                }})
                            } variant="outline" type={"date"} css={{ "--focus-color": "blue" }}/>
                    <Field.ErrorText>{errors.birthDate?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.salary} width="320px">
                    <Field.Label>Salary</Field.Label>
                    <Input {...register("salary", {
                        required: {value: true, message: "Salary is required"},
                        min: {value: 20_000, message: "Salary must be greater then 20_000"}
                    })}
                           variant="outline"
                           type={"number"}
                           defaultValue={employee?.salary}
                           css={{ "--focus-color": "blue" }}
                    />
                    <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
                </Field.Root>
                <HStack>
                    <Button focusRingColor="red.500" type="submit">Submit</Button>
                    <Button colorScheme="pink" type="reset">Reset</Button>
                </HStack>
            </form>
        </Box>
    );
};

export default EmployeeEditForm;