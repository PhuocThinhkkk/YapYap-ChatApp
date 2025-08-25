"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface roomMessageChartData {
  date: string;
  dayInWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  yourRoom: number;
  orthersRoom: number;
}

const chartConfig = {
  yourRoom: {
    label: "your Room",
    color: "#2563eb",
  },
  orthersRoom: {
    label: "orthers Room",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function Area_Chart() {
  const [dataChart, setDataChart] = useState<roomMessageChartData[] | null>(
    null,
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    const initialFetching = async () => {
      try {
        const res2 = await fetch(`/api/charts/area-chart`, {
          cache: "no-store",
        });
        if (!res2.ok) {
          return;
        }
        const data2: roomMessageChartData[] = await res2.json();

        setDataChart(data2);
        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        toast.error(`${error}`);
      }
    };
    initialFetching();
  }, []);

  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>Your messages in rooms </CardTitle>
        <CardDescription>
          Showing total messages for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-full">
          <AreaChart
            accessibilityLayer
            data={dataChart || []}
            margin={{
              left: 12,
              right: 12,
              top: 4,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dayInWeek"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="orthersRoom"
              type="natural"
              fill="var(--color-orthersRoom)"
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              dataKey="yourRoom"
              type="natural"
              fill="var(--color-yourRoom)"
              fillOpacity={0.6}
              stroke="var(--color-orthersRoom)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
