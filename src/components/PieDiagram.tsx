import type {ColoredDiagramPoint, DiagramPoint, DiagramProps} from "../model/types.ts";
import {Chart, useChart} from "@chakra-ui/charts";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {randomSubarray} from "../utils/math.ts";
import {colors} from "../model/colors.ts";

const coloringFun: (a: DiagramPoint[])=> ColoredDiagramPoint[] = (a) => {
    const dColors = randomSubarray<string>(colors, a.length);
    return a.map((p, index) => ({
        ...p,
        color: dColors[index]
    }))
}

const PieDiagram = ({
  data, aggFunc,
}: DiagramProps) => {
    const aggData = coloringFun(aggFunc(data));
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