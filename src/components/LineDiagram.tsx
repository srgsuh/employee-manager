import {Chart, useChart} from "@chakra-ui/charts";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import type {DiagramProps} from "../model/types.ts";
import {getRandomElement} from "../utils/math.ts";
import {colors} from "../model/colors.ts";

const LineDiagram = ({data, aggFunc, xLabel}: DiagramProps) => {
    const aggData = aggFunc(data);
    const chart = useChart({
        data: aggData,
        series: [{ name: "value", color: getRandomElement(colors) }],
    })
    return (
        <Chart.Root maxH="sm" chart={chart}>
            <LineChart data={chart.data}>
                <CartesianGrid stroke={chart.color("border")} vertical={false} />
                <XAxis
                    axisLine={false}
                    dataKey={chart.key("name")}
                    stroke={chart.color("border")}
                    label={{ value: xLabel || "Value", position: "bottom" }}
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
                    labelFormatter={(value) => `${xLabel}: ${value}`}
                    formatter={(value) => `Employees: ${value}`}
                    content={<Chart.Tooltip hideSeriesLabel={true} />}
                />
                {chart.series.map((item) => (
                    <Line
                        key={item.name}
                        isAnimationActive={false}
                        dataKey={chart.key(item.name)}
                        stroke={chart.color(item.color)}
                        strokeWidth={2}
                        dot={false}
                        type="natural"
                    />
                ))}
            </LineChart>
        </Chart.Root>
    );
};

export default LineDiagram;