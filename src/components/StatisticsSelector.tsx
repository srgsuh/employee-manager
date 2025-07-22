import type {SelectorItem} from "../model/types.ts";
import GenericNavMenu from "./GenericNavMenu.tsx";
import {NavLink, useLocation} from "react-router-dom";
import type {ReactElement} from "react";

const StatisticsSelector = () => {
    const location = useLocation();
    const items: SelectorItem[] = [
        {name: "Age stats", value: "age", path: "/statistics/by-age"},
        {name: "Salary stats", value: "sal", path: "/statistics/by-salary"},
        {name: "Department stats", value: "dep", path: "/statistics/by-department"},
    ];
    const menuName = items.find(
        ({path})=>(path === location.pathname))
        ?.name ?? "Statistics";
    const getLink = (item: SelectorItem): ReactElement => {
        return <NavLink to={`${item.path}`}>{item.name}</NavLink>
    }
    return (
        <GenericNavMenu items={items}
                        menuName={menuName}
                        getLink={getLink}
        isActive={location.pathname.startsWith("/statistics")}>
        </GenericNavMenu>
    );
};

export default StatisticsSelector;