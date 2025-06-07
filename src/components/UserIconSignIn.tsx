import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserDbInSession } from "@/lib/auth"
import User from "@/schema/user";
import { UserDB } from "@/type";
import ButtonLinkSignIn from "./ButtonLinkSignIn";
import Link from "next/link";


const UserIconSignIn = async () => {
    const userIdInSession = await getUserDbInSession();
    const user : UserDB | null = await User.findById(userIdInSession);
    
    return (
    <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200">
        {  
            (userIdInSession && user) ?
                <div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">Online</p>
                    </div>
                </div> : null
            }
            { (userIdInSession && user) ?
                <div>   
                    <div className="relative">
                        <Link href="/home">
                             <Avatar className="w-12 h-12 border-2 border-indigo-200">
                                <AvatarImage src={user.avatarUrl} />
                                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                       
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                </div> : <ButtonLinkSignIn/>
        }
    </div>
    )
}

export default UserIconSignIn