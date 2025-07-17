import {Chart, useChart} from "@chakra-ui/charts";
import {HStack} from "@chakra-ui/react";
import {Cell, LabelList, Pie, PieChart, Tooltip} from "recharts";

const DepartmentStatsPage = () => {
    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: [
            { name: "IT", value: 54, color: "red.solid" },
            { name: "QA", value: 17, color: "green.solid" },
            { name: "HR", value: 4, color: "blue.solid" },
            { name: "Sales", value: 32, color: "purple.solid" },
            { name: "Marketing", value: 14, color: "orange.solid" },
        ],
    })

    return (
        <HStack p={2} justifyContent="center" alignItems="center">
            <Chart.Root boxSize="320px" mx="auto" chart={chart}>
                <PieChart>
                    <Tooltip
                        cursor={false}
                        animationDuration={100}
                        content={<Chart.Tooltip hideLabel />}
                    />
                    <Pie
                        isAnimationActive={false}
                        data={chart.data}
                        dataKey={chart.key("value")}
                    >
                        <LabelList position="inside" fill="white" stroke="none" />
                        {chart.data.map((item) => (
                            <Cell key={item.name} fill={chart.color(item.color)} />
                        ))}
                    </Pie>
                </PieChart>
            </Chart.Root>
        </HStack>
    )
};

export default DepartmentStatsPage;