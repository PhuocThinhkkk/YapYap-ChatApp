import 'server-only'
import { UserCookie, UserDB } from '@/type';
import {cookies} from "next/headers"


type ReturnType = {
  message: string
}
export async function setUserInforInCookie({ user } : {user : UserDB}) : Promise<UserCookie | ReturnType> {
  try{
    const cookieStore = await cookies();
    console.log("UserCookie :", user);

    const roomsLength = user.rooms?.length;
    const roomsOwnLength = user.roomsOwn?.length;
    delete user.rooms;
    delete user.roomsOwn;
    const newUser = {
      ...user,
      roomsLength,
      roomsOwnLength,
    }
    cookieStore.set('user', JSON.stringify(newUser))
    return newUser as UserCookie;
  }catch(e){
    return { message : `error when setting cookies: ${e}`}
  }
}