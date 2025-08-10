import {Button, Menu, Portal} from "@chakra-ui/react";
import MotionElement from "./MotionElement.tsx";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {departments} from "../config/employees-config.json";
import {useState} from "react";
import useEmployeeFilter from "../state-management/store.ts";

interface MenuItem {
    value: string;
    department: string;
}

const defaultItem: MenuItem = {value: "__all__", department: "All departments"};

function buildMenuItems(): MenuItem[] {
    const menuItems = departments.map((d) => ({
        value: d,
        department: d
    }));
    return [defaultItem, ...menuItems];
}

const DepartmentSelector = () => {
    const department = useEmployeeFilter((state) => state.department);
    const setDepartment = useEmployeeFilter((state) => state.setDepartment);
    const [isOpen, setIsOpen] = useState(false);

    const onSelect = (item: MenuItem) => {
        setDepartment(item.value === defaultItem.value? null: item.department);
        setIsOpen(false);
    }

    const itemList = buildMenuItems();
    return (
        <Menu.Root open={isOpen}
                   onOpenChange={(details) => setIsOpen(details.open)}
        >
            <Menu.Trigger asChild>
                <Button variant="outline" size="md" minW={135}>
                    {department || defaultItem.department}
                    { isOpen? <MotionElement ><FaChevronUp /></MotionElement>
                        : <FaChevronDown />}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <MotionElement zIndex={1000}>
                        <Menu.Content>
                            {itemList?.map((item) => (
                                <Menu.Item
                                    key={item.value}
                                    value={`${item.value}`}
                                    onSelect={() => onSelect(item)}>
                                    {item.department}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </MotionElement>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default DepartmentSelector;