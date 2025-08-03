import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import type {Employee} from "../model/dto-types.ts";
import EmployeeEditForm from "./EmployeeEditForm.tsx";

interface EmployeeEditWindowProps {
    affector: (e: Employee) => Promise<Employee>;
    employee: Employee;
}

const EmployeeEditWindow = (
    {affector, employee}: EmployeeEditWindowProps
) => {
    return (
        <Dialog.Root size="cover"
                     placement="center"
                     trapFocus={false}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Edit
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
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