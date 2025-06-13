"use server"
import connectDB from "./lib/mongoDb"
import User from "@/schema/user";
import Room from "@/schema/room"
import { createSession, } from "./lib/session"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import { setUserInforInCookie } from "./lib/auth";


export const createUser = async (_prevState : unknown ,formData : FormData) =>{
  

  const validatedFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    roomOwn: [],
    rooms: [],
  }

  
  await connectDB();
  const user = new User(validatedFields)

  const isExist = await User.findOne({ email : user.email } );

  if(isExist){
    return {message: 'Your email is exists! '}
  }

  await user.save();
  await createSession(user._id.toString());

  const cookieStore = await cookies();
  const UserCookie = ({...user})._doc;
  UserCookie.roomsLength = UserCookie.rooms.length;
  delete UserCookie.rooms;
  delete UserCookie.password;
  cookieStore.set('user', JSON.stringify(UserCookie));
  redirect('/')
}

interface UserForm {
  email : string,
  password : string
}
export const signIn = async (_prevState : unknown ,form : FormData) => {

  const userForm : UserForm  = {
    email : form.get("email") as string ,
    password : form.get("password") as string
  }


  await connectDB();
  const UserExist = await User.findOne({email : userForm.email});
  
  if(!UserExist){

    return {message: 'Your email is not correct !'};
  }

  const isPassWordCorrect = UserExist.password === userForm.password;
  if(!isPassWordCorrect){

    return {message: 'Your password is not correct !'};
  }

  await createSession(UserExist._id.toString());

  const user = JSON.parse(JSON.stringify(UserExist));
  
  const newUser = await setUserInforInCookie({user})
  if ('message' in newUser) {
    return newUser;
  }
  redirect("/");
  
}

type res = {
  message : string
}

export async function SearchRoom (_prevState : unknown , formData: FormData) : Promise<res> {
  
  if(!formData) return {message: "Please enter the form"}
  const roomName = formData.get('roomName') as string
  if(!roomName) {

    return {message: "Please enter a room name"}
  }
  

  const cookieStore = await cookies()
    const user = cookieStore.get('user')
    if(!user) {
  
      return {message: "Please sign in to join a room"}
    }
    const userId = JSON.parse(user.value)._id;
 
  const password = formData.get('password') as string
  await connectDB();
  const room = await Room.findOne({ roomName })
  if(!room) {

    return {message: "Room not found"}
  }
  if(room.password !== password) {



    return {message: "Wrong password"}
  }
  if(room.users.length >= room.maxPeople) {
  
      return {message: "Room is full"}
  }
  for (let i = 0; i < room.users.length; i++) {
    if(room.users[i].toString() === userId.toString()) {
  
      return {message: "You are already in this room"}
    }
  }
  await Room.updateOne({ roomName }, { $addToSet: { users: userId } })
  revalidatePath('/rooms')
  redirect('/rooms')

}