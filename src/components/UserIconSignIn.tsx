
import { getUserIdInSession } from "@/lib/session"
import ButtonLinkSignIn from "./ButtonLinkSignIn";
import UserDropDown from "./UserDropDown";
import { getUserById } from "@/lib/db/userdb";


const UserIconSignIn = async () => {
    try{
        const userIdInSession = await getUserIdInSession();
        let user
        if (userIdInSession) {
            user  = await getUserById(userIdInSession)     
        }
        console.log(user)
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
    }catch(e){
        console.error(e)
        return
    }
}

export default UserIconSignIn