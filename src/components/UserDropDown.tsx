'use client'
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, } from "lucide-react"
import { UserDB } from "@/type"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { useQueryClient } from "@tanstack/react-query"


const UserDropDown = (
{
  userIdInSession,
  user,
}: {
  userIdInSession: string 
  user: UserDB
}) => {
    const [isLogOut, setIsLogOut] = useState(false)
    const route = useRouter()
    const clientQuery = useQueryClient()
    
    async function onLogout(event: React.MouseEvent<HTMLElement>) {
            try{
            event.preventDefault();
            setIsLogOut(true);
            const res = await fetch('/api/session', {
                method: 'DELETE'
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(`${data.message}`)
                setIsLogOut(false);
                return;
            }
            
            toast.success('logout successfully')
            clientQuery.invalidateQueries({ queryKey: ["UserInfor"] });
            route.refresh()
            route.push("/sign-in")
            return;
        }catch(error){
            console.error(error)
            toast.error("there is something wrong!")
        }
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="inline-flex gap-4 hover:cursor-pointer">
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">Online</p>
                </div>
                
                <Avatar className="w-12 h-12 border-2 border-indigo-200">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
                        {user.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            
            </div>
            
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-slate-900 sm:hidden">
            {user.name}
            <p className="text-xs font-normal text-slate-500">Online</p>
        </div>
        <DropdownMenuSeparator className="sm:hidden" />
        <DropdownMenuItem asChild>
            <Link href={`/users/${userIdInSession}`} className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
            </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
            disabled={isLogOut}
        >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDown
