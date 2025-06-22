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
import { toast } from "sonner"
import { resPieChart } from "@/type"


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Component() {
  const [isClient, setIsClient] = useState(false)
   const [total, setToal] = useState< number | null >(null)
   const [formattedTime, setFormatTime] = useState<string>("")
  const [chartData, setChartData ] = useState<resPieChart[]>([]);
  useEffect(() => {
    setIsClient(true);
   
    const initialFetching = async () =>{
      try { 
        const res = await fetch("/api/session")
        const data = await res.json();

        if(!res.ok) {
          throw new Error(`status: ${res.status}, ${data.message}`)
        }
        if (!data) {
          throw new Error(`No session. Please sign in to continue`)
        }
        const res2 = await fetch(`/api/users/${data}/dashboard/pie-chart`, {
          cache: 'no-store'
        })
        const data2 = await res2.json()
        if (!res2.ok) {
          throw new Error(`status: ${res2.status}, ${data2.message}`)
        }
        setChartData(data2) 
        
        let totals = 0;
        for (let index = 0; index < data2.length; index++) {
          totals += data2[index].count

        }
        setToal(totals);

      } catch (error) {
        toast.error(`${error}`)
      }
    }
    initialFetching();
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11 (Jan=0, Dec=11)

    const formatteTime = `${monthNames[0]} - ${monthNames[currentMonth]} ${currentYear}`;
    setFormatTime(formatteTime)

  }, [])


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Messages in your rooms</CardTitle>
        <CardDescription>{formattedTime}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center flex text-xs lg:text-sm">
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
                  <Cell key={`cell-${index}`} fill={entry.fill}/>
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
          Totals : {total} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total messages for each room
        </div>
      </CardFooter>
    </Card>
  )
}
