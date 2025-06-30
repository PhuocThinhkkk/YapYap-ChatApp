'use client'
import ButtonLinkSignIn from "./ButtonLinkSignIn";
import UserDropDown from "./UserDropDown";
import { useQuery } from "@tanstack/react-query";
import { UserDB } from "@/type";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const UserIconSignIn = () => {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['UserInfor'],
            queryFn: async () => {
                const response = await fetch(`/api/users/current`)
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Network response was not ok')
                }
                return data as UserDB
            },
        }
    )
    if (isLoading) {
        return <Loader2 className="animate-spin text-primary h-10 w-10" />
    }
    if(error || !data){
        toast.error(`${error}`)
        return <ButtonLinkSignIn/>
    }
   
    return (
        
        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200">
            <UserDropDown 
            userIdInSession={data._id}
            user={data}
            /> :
        </div>
    )
}

export default UserIconSignIn