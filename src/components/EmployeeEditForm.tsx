import {Controller, useForm} from "react-hook-form";
import type {Employee} from "../model/dto-types.ts";
import {
    Box,
    Button, CloseButton,
    createListCollection, Dialog,
    Field,
    HStack,
    Input,
    Portal,
    Select, Spinner, VStack
} from "@chakra-ui/react";
import {getAgeFromDate} from "./utils/math.ts";
import useEmployeesMutation from "../hooks/useEmployeesMutation.ts";
import {useState} from "react";

interface EmployeeEditFormProps {
    affector: (e: Employee) => Promise<Employee>;
    baseEmployee?: Employee;
}

const depItems: {label: string, value: string}[] = [
    {label: "IT", value: "IT"},
    {label: "QA", value: "QA"},
    {label: "HR", value: "HR"},
    {label: "Sales", value: "Sales"},
    {label: "Finance", value: "Finance"},
]

const EmployeeEditForm = (
    {affector, baseEmployee}: EmployeeEditFormProps
) => {
    const updAffector = (e: Employee) =>
        new Promise<Employee>((resolve) => {
        setTimeout(() => {
            const affectedEmpl = affector(e);
            resolve(affectedEmpl);
        }, 1500);
    });
    const mutator = useEmployeesMutation<Employee>(
        updAffector
    );

    const [showResult, setShowResult] = useState(false);
    const onMutateSuccess = (empl: Employee) => {
        setShowResult(true);
        console.log("Success: " + empl.fullName + " was updated. ID = " + empl.id);
    }

    const submitHandler = (editEmployee: Employee) => {
        const employee = {...baseEmployee, ...editEmployee};
        mutator.mutate(employee, {
            onSuccess: onMutateSuccess
        });
    };
    const { register, handleSubmit, formState, control } = useForm<Employee>({
        defaultValues: {
            fullName: baseEmployee?.fullName || undefined,
            birthDate: baseEmployee?.birthDate || undefined,
            salary: baseEmployee?.salary || undefined,
            department: baseEmployee?.department || undefined
        }
    });
    const errors = formState.errors;

    const departments = createListCollection({items: depItems});
    return (
        <VStack maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="lg">
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
                           defaultValue={baseEmployee?.salary}
                           css={{ "--focus-color": "blue" }}
                    />
                    <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
                </Field.Root>
                <HStack>
                    <Button
                        focusRingColor="red.500"
                        type="submit"
                        loading={mutator.isPending}
                        loadingText="Updating">Submit</Button>
                    <Button colorScheme="pink" type="reset">Reset</Button>
                </HStack>
            </form>
            <Dialog.Root role="dialog"
                         open = {showResult}
                         onOpenChange = {(details) => setShowResult(details.open)}
                         placement={"top"}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create record confirmation</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>
                                    The new employee record successfully created.
                                </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button background={"green.500"} color={"black"}>OK</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </VStack>
    );
};

export default EmployeeEditForm;