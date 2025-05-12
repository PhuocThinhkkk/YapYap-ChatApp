
'use client'
import { Button } from "@/components/ui/button"
import  Link  from "next/link"

const ButtonCreateRoom = () => {
  return (
    <Link href={"/create-room"}><Button className=" h-3/5 w-24 font-bold bg-blue-700 text-xs hover:bg-blue-900 hover:cursor-pointer" > Create room</Button>
    </Link>
    
  )
}

export default ButtonCreateRoom