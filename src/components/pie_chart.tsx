"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector, Tooltip } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { useDispatch, useSelector } from "react-redux"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-completed))",
  },
  onProgress: {
    label: "On Progress",
    color: "hsl(var(--chart-onProgress))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-pending))",
  },
}

export function Component() {
  const dispatch = useDispatch()
  const { completed, onProgress, pending } = useSelector((state: any) => state.tasks)
  const [activeStatus, setActiveStatus] = React.useState("completed")

  const activeData = [
    { status: "completed", value: completed, fill: chartConfig.completed.color },
    { status: "onProgress", value: onProgress, fill: chartConfig.onProgress.color },
    { status: "pending", value: pending, fill: chartConfig.pending.color },
  ]

  const activeIndex = React.useMemo(
    () => activeData.findIndex((item) => item.status === activeStatus),
    [activeStatus]
  )

  return (
    <Card className="flex flex-col">
      <ChartStyle config={chartConfig} id={""} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Task Status - Pie Chart</CardTitle>
          <CardDescription>Task Progress (Completed, In Progress, Pending)</CardDescription>
        </div>
        <Select value={activeStatus} onValueChange={(status) => setActiveStatus(status)}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select task status"
          >
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {Object.keys(chartConfig).map((status) => (
              <SelectItem key={status} value={status} className="rounded-lg">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: chartConfig[status as keyof typeof chartConfig].color,
                    }}
                  />
                  {chartConfig[status as keyof typeof chartConfig].label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer className="mx-auto aspect-square w-full max-w-[300px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={activeData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {activeData[activeIndex].value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {activeData[activeIndex].status}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <Tooltip content={<ChartTooltipContent />} cursor={false} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}



// import { Card, CardContent } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// const data = [
//   { name: "High", value: 6 },
//   { name: "Medium", value: 4 },
//   { name: "Low", value: 2 },
// ];

// const COLORS = ["#EF4444", "#F59E0B", "#10B981"];

// const PriorityPieChart = () => {
//   return (
//     <Card className="w-full max-w-xs bg-white shadow-sm">
//       <CardContent className="p-2">
//         <h3 className="text-center text-sm font-semibold mb-2">Task Priority</h3>
//         <div className="w-full h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={60}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PriorityPieChart;


