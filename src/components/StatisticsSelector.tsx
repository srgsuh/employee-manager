import type {SelectorItem} from "../model/types.ts";
import GenericNavMenu from "./GenericNavMenu.tsx";

const StatisticsSelector = () => {
    const items: SelectorItem[] = [
        {name: "Age stats", value: "by-age"},
        {name: "Salary stats", value: "by-salary"},
        {name: "Department stats", value: "by-department"},
    ];
    return (
        <GenericNavMenu items={items}
                        menuName={"Statistics"}
                        getLink={(item) => `/statistics/${item.value}`}>
        </GenericNavMenu>
    );
};

export default StatisticsSelector;