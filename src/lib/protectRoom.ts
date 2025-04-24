
import connectDB from "@/lib/mongoDb";
import { decrypt, getSession } from "@/lib/session";
import User from "@/schema/user";




export async function protectRoom(roomid: string) : Promise<string> {
    try{
        console.log("room id ", roomid)
        await connectDB()
        const session = await getSession();
        if(!session) return "no session, please sign in to continue.";
        const JwtPayload = await decrypt(session);
        
        if(!JwtPayload) return "no JwtPayload, please sign in to continue.";
        console.log("JwtPayload: ", JwtPayload)
        const userId = JwtPayload.userId;
        console.log("user id: ", userId)

        const userDb = await User.findById(userId);
        if(!userDb) return "no user in db";

        let isInRoom = false;
        for(const roomId of userDb.rooms){
        if(roomId == roomid){
            console.log("user is in this room")
            isInRoom = true;
            break;
        }
        }
        if(!isInRoom) return "you are not alow to go to this room";

        return "success";
    }catch(err){
        console.log("error when protect room: ", err);
        return "error when protect room: " + err;
    }
}