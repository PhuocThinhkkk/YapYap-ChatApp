import "server-only"
import connectDB from "@/lib/mongoDb";
import MESSAGE from "@/schema/message";
import User from "@/schema/user";
import { UserDB, UserProfile } from "@/type";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


export async function getUser( userId : string ) : Promise<UserProfile | null> {
    await connectDB()
    const userdb = await User.findById(userId).select('-password').lean();
    if (!userdb) {
        return null;
    }
    const user : UserDB = JSON.parse( JSON.stringify(userdb) );
    const messagesSent : number = await MESSAGE.countDocuments( { userId } )
    const roomsLen : number = user.rooms ? user.rooms.length : 0;
    const roomsOwnLen : number =  user.roomsOwn ? user.roomsOwn.length : 0;
    delete user.rooms;
    delete user.roomsOwn;

    dayjs.extend(utc);
    dayjs.extend(timezone);


    const myDate = user.createdAt;
    const vietnamTime = dayjs(myDate).tz('Asia/Ho_Chi_Minh');
    const joinAt : string = vietnamTime.format('DD-MM-YYYY');

    
    const result : UserProfile = {
        ...user,
        roomsLen,
        roomsOwnLen,
        messagesSent,
        joinAt,
    }
    return result;
}