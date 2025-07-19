import type {DiagramProps} from "../model/types.ts";
import type {Employee} from "../model/dto-types.ts";
import _ from "lodash";
import {Chart, useChart} from "@chakra-ui/charts";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

const groupingFunction = (e: Employee) => e.department;
const aggregateFunction: (a: Employee[])=> number = a => a.length;


const colors = [
    "teal.solid",
    "red.solid",
    "cyan.solid",
    "purple.solid",
    "green.solid",
    "pink.solid",
    "yellow.solid",
    "blue.solid",
    "orange.solid",
];

const PieDiagram = ({
  data,
}: DiagramProps) => {
    const grouped = _.groupBy(data, groupingFunction);
    const aggData = Object.entries(grouped).map(([dept, arr], idx) => {
        return {
            name: dept,
            value: aggregateFunction(arr),
            color: colors[idx]
        }
    });
    const chart = useChart({
        data: aggData
    });

    return (
        <Chart.Root boxSize="400px" mx="auto" chart={chart}>
            <PieChart>
                <Legend content={<Chart.Legend />} />
                <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                />
                <Pie
                    isAnimationActive={false}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    outerRadius={100}
                    innerRadius={0}
                    labelLine={false}
                    label={({ name, value }) => {
                        return `${name}: ${value}`
                    }}
                >
                    {chart.data.map((item) => {
                        return <Cell key={item.name} fill={chart.color(item.color)} />
                    })}
                </Pie>
            </PieChart>
        </Chart.Root>
    );
};

export default PieDiagram;