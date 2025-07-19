import {Chart, useChart} from "@chakra-ui/charts";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import type {DiagramProps} from "../model/types.ts";
import _ from "lodash";
import {getAgeFromDate} from "./utils/math.ts";

const groupingFunction = (v: number): string => {
    const vr = Math.floor(v/10)*10;
    return `${vr} - ${vr + 10}`;
};

const LineDiagram = ({data}: DiagramProps) => {
    const ageData = data.map(e => getAgeFromDate(e.birthDate));
    const groupData = _.countBy(ageData, groupingFunction);
    const aggData = _.sortBy(
        Object.entries(groupData).map(
            ([k, v]) => ({point: k, count: v})
        ), ["point"]
    );


    const chart = useChart({
        data: aggData,
        series: [{ name: "count", color: "purple.solid" }],
    })
    return (
        <Chart.Root maxH="sm" chart={chart}>
            <LineChart data={chart.data}>
                <CartesianGrid stroke={chart.color("border")} vertical={false} />
                <XAxis
                    axisLine={false}
                    dataKey={chart.key("point")}
                    stroke={chart.color("border")}
                    label={{ value: "Age", position: "bottom" }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    stroke={chart.color("border")}
                    label={{ value: "Employees", position: "left", angle: -90 }}
                />
                <Tooltip
                    animationDuration={100}
                    cursor={false}
                    content={<Chart.Tooltip />}
                />
                {chart.series.map((item) => (
                    <Line
                        key={item.name}
                        isAnimationActive={false}
                        dataKey={chart.key(item.name)}
                        stroke={chart.color(item.color)}
                        strokeWidth={2}
                        dot={false}
                    />
                ))}
            </LineChart>
        </Chart.Root>
    );
};

export default LineDiagram;