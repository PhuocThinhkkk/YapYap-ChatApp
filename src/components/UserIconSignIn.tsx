
import { getUserIdInSession } from "@/lib/session"
import User from "@/schema/user";
import { UserDB } from "@/type";
import ButtonLinkSignIn from "./ButtonLinkSignIn";
import UserDropDown from "./UserDropDown";


const UserIconSignIn = async () => {
    const userIdInSession = await getUserIdInSession();
    const userdb  = await User.findById(userIdInSession).select('-password').lean();
    const user : UserDB | null = JSON.parse(JSON.stringify(userdb))
    console.log("sdkafajfkl",user)
    return (
        
        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200">
            {  
                (userIdInSession && user) ?
                    <UserDropDown 
                    userIdInSession={userIdInSession}
                    user={user}
                    /> : <ButtonLinkSignIn/>
            }
        </div>


    
    )
}

export default UserIconSignIn