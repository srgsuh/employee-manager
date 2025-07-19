import {type ReactElement, useState} from "react";
import {Button, Menu, Portal} from "@chakra-ui/react";
import MotionElement from "./MotionElement.tsx";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import type {SelectorItem} from "../model/types.ts";

interface MenuProps<T extends SelectorItem> {
    items: T[];
    menuName: string;
    getLink(item: T): ReactElement;
    isActive: boolean;
}


const GenericNavMenu =
    <T extends SelectorItem>({items, getLink, menuName, isActive,}: MenuProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Menu.Root open={isOpen}
            onOpenChange={(details) => setIsOpen(details.open)}>
            <Menu.Trigger asChild>
                <Button fontWeight={isActive? "bold": "normal"} variant="ghost" size="sm" minW={200}>
                    {menuName}
                    { isOpen? <MotionElement ><FaChevronUp /></MotionElement>
                        : <FaChevronDown />}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <MotionElement zIndex={1000}>
                        <Menu.Content>
                            {items.map((item) => (
                                <Menu.Item asChild
                                           key={item.value}
                                           value={item.value}
                                >
                                    {getLink(item)}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </MotionElement>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default GenericNavMenu;