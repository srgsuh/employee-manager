import {Chart, useChart} from "@chakra-ui/charts";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const LineDiagram = () => {
    const aggData = [
        { point: 20, count: 19 },
        { point: 30, count: 29 },
        { point: 40, count: 38 },
        { point: 50, count: 54 },
        { point: 60, count: 27 },
        { point: 70, count: 11 },
    ]

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
                    label={{ value: "Customers", position: "left", angle: -90 }}
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