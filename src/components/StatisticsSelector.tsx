import type {SelectorItem} from "../model/types.ts";
import GenericNavMenu from "./GenericNavMenu.tsx";
import {NavLink} from "react-router-dom";
import type {ReactElement} from "react";

const StatisticsSelector = () => {
    const items: SelectorItem[] = [
        {name: "Age stats", value: "by-age"},
        {name: "Salary stats", value: "by-salary"},
        {name: "Department stats", value: "by-department"},
    ];
    const getLink = (item: SelectorItem): ReactElement => {
        return <NavLink to={`statistics/${item.value}`}>{item.name}</NavLink>
    }
    return (
        <GenericNavMenu items={items}
                        menuName={"Statistics"}
                        getLink={getLink}>
        </GenericNavMenu>
    );
};

export default StatisticsSelector;