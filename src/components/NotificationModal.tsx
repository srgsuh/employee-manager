import {OpenChangeDetails} from "@chakra-ui/react/dist/types/components/dialog/namespace";
import type {FC} from "react";
import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";

interface NotificationModalProps {
    isOpen: boolean;
    onIsOpenChange: (changeOpen: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    isError: boolean;
}

const NotificationModal: FC<NotificationModalProps> = ({
    isOpen, onIsOpenChange, title, description, onConfirm, isError}) => {
    return (
        <Dialog.Root role="dialog"
                     open = {isOpen}
                     onOpenChange = {(details) => onIsOpenChange(details.open)}
                     placement={"top"}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p color = {isError? "red": "black"}>{description}</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button background={isError? "red": "black"}
                                        color={"white"}
                                        onClick = {onConfirm}
                                >
                                    OK
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default NotificationModal;