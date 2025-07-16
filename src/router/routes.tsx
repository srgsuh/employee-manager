import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import AddEmployeePage from "../pages/AddEmployeePage.tsx";
import StatisticsPage from "../pages/StatisticsPage.tsx";
import AgeStatsPage from "../pages/AgeStatsPage.tsx";
import DepartmentStatsPage from "../pages/DepartmentStatsPage.tsx";
import SalaryStatsPage from "../pages/SalaryStatsPage.tsx";
import Layout from "../pages/Layout.tsx";

const router = createBrowserRouter([
    {path: '/', element: <Layout />, children: [
        {path: '', element: <HomePage />},
        {path: 'add', element: <AddEmployeePage />},
        {path: 'stats', element: <StatisticsPage />, children: [
                {path: 'by-age', element: <AgeStatsPage />},
                {path: 'by-department', element: <DepartmentStatsPage />},
                {path: 'by-salary', element: <SalaryStatsPage />},
            ]},
    ]},
]);

export default router;