"use client"
import { Button } from "@/components/ui/button"
import  Link  from "next/link"
import { Plus } from "lucide-react"
import { useState } from "react"

const ButtonCreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Link href={"/create-room"} onClick={()=>{
      setIsLoading(true)
      }}>
      <Button disabled={isLoading} className="hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
        <Plus className="w-4 h-4 mr-2" />
        Create room
      </Button>
    </Link>
    
  )
}

export default ButtonCreateRoom