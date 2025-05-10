"use client"

import { useState, useEffect} from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const colors = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ffc658", // yellow
  "#ff7f50", // coral
  "#8dd1e1", // light blue
  "#a4de6c", // light green
  "#d0ed57", // lime
  "#ffc0cb", // pink
  "#ffbb28", // orange
  "#00C49F", // teal
];


export function Component() {
  const [isClient, setIsClient] = useState(false)
  const [total, setToal] = useState< number | null >(null)
  const [chartData, setChartData ] = useState<unknown[]>([]);
  useEffect(() => {
    setIsClient(true);
    const initialFetching = async () =>{
      const res = await fetch("/api/session")
      const data = await res.json();
      console.log("hello")
      if(res.status != 200) {
        return
      }
      console.log("user payload: ",data)
      if (!data.userId) {
        return
      }
      const res2 = await fetch(`/api/users/${data.userId}/dashboard/pie-chart`, {
        cache: 'no-store'
      })
      if (res2.status != 200) {
        console.log("false to fetch pie chart data")
        return
      }
      const data2 = await res2.json();
      console.log("area chart data: ", data2)
      setChartData(data2)
    }

    initialFetching();
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center flex">
        { isClient ? 
          <PieChart width={430} height={250}>
            <Pie data={chartData} dataKey="count" cx="50%" cy="50%" outerRadius={80} label>
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={(entry as { color: string }).color}/>
                ))
              }
            </Pie>
          </PieChart>
          : null
        }
        
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
