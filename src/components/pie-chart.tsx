"use client"

import { useState, useEffect} from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Array of beautiful colors with their names and hex values
  const beautifulColors = [
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Mint Green", hex: "#98FB98" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Peach", hex: "#FFDAB9" },
    { name: "Lilac", hex: "#C8A2C8" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "Periwinkle", hex: "#CCCCFF" },
    { name: "Mauve", hex: "#E0B0FF" },
    { name: "Teal", hex: "#008080" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Sage Green", hex: "#BCB88A" },
    { name: "Powder Blue", hex: "#B0E0E6" },
    { name: "Blush Pink", hex: "#FFB6C1" },
  ]


export function Component() {
  const [isClient, setIsClient] = useState(false)
  // const [total, setToal] = useState< number | null >(null)
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
      if (!data._id) {
        return
      }
      const res2 = await fetch(`/api/users/${data._id}/dashboard/pie-chart`, {
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
        <CardTitle>Messages in your rooms</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center flex">
        { isClient ? 
          <PieChart width={430} height={250}>
            <Pie 
            data={chartData}
            dataKey="count" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            nameKey="roomName"
            >
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={beautifulColors[index].hex}/>
                ))
                
              }
              
            </Pie>
            <Tooltip />
            <Legend/>
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
