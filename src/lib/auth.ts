import 'server-only'
import connectDB from './mongoDb';
import { getSession, decrypt } from './session';
import User from '@/schema/user';
import { UserCookie, UserDB } from '@/type';
import {cookies} from "next/headers"

export async function getUserDbInSession(){
  const session = await getSession();
  if(!session) return null
  const payload = await decrypt(session)
  if(!payload) return null
  await connectDB()
  const data = await User.findById(payload.userId).lean()
  if(!data) return null
  const user : UserDB = JSON.parse(JSON.stringify(data));
  return user;
}



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