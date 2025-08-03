import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import type {Employee} from "../model/dto-types.ts";
import EmployeeEditForm from "./EmployeeEditForm.tsx";
import {useColorModeValue} from "./ui/color-mode.tsx";

interface EmployeeEditWindowProps {
    affector: (e: Employee) => Promise<Employee>;
    employee: Employee;
    isDisabled: boolean;
}

const EmployeeEditWindow = (
    {affector, employee, isDisabled}: EmployeeEditWindowProps
) => {
    const bgColor = useColorModeValue("purple.500", "purple.300");
    return (
        <Dialog.Root placement="top" role="dialog">
            <Dialog.Trigger asChild>
                <Button variant="outline"
                        size="sm"
                        background={bgColor}
                        color = "black"
                        disabled = {isDisabled}
                >
                    Edit
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit employee record</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <EmployeeEditForm affector={affector} baseEmployee={employee}/>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default EmployeeEditWindow;