"use server"
import connectDB from "./lib/mongoDb"
import User from "@/schema/user";
import Room from "@/schema/room"
import { createSession, getSession } from "./lib/session"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"


export const createUser = async (_prevState : unknown ,formData : FormData) =>{
  
  console.log("Received FormData:", formData)
  const validatedFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    roomOwn: [],
    rooms: [],
  }

  console.log(validatedFields);
  await connectDB();
  const user = new User(validatedFields)

  const isExist = await User.findOne({ email : user.email } );

  if(isExist){
    console.log("user is exists in db");
    return {message: 'Your email is exists! '}
  }
  console.log("new user : ", user);

  await user.save();
  await createSession(user._id.toString());
  console.log("new user sign up successfully");
  const session1 = await getSession();
  console.log("get session:", session1);

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
  console.log("form :" , userForm);

  await connectDB();
  const UserExist = await User.findOne({email : userForm.email});
  
  if(!UserExist){
    console.log("no user with that email in db");
    return {message: 'Your email is not correct !'};
  }

  const isPassWordCorrect = UserExist.password === userForm.password;
  if(!isPassWordCorrect){
    console.log("password is not correct");
    return {message: 'Your password is not correct !'};
  }

  await createSession(UserExist._id.toString());
  console.log("user sign in successfully");
  const cookieStore = await cookies();

  const UserCookie = ({...UserExist})._doc;

  console.log("UserCookie :", UserCookie);
  UserCookie.roomsLength = UserCookie.rooms.length;
  UserCookie.roomsOwnLength = UserCookie.roomsOwn.length;
  delete UserCookie.rooms;
  delete UserCookie.password;
  delete UserCookie.roomsOwn;

  cookieStore.set('user', JSON.stringify(UserCookie))
  console.log("User :", UserCookie);
  redirect("/");
}

export async function SearchRoom (formData: FormData) {
  
  if(!formData) return
  const roomName = formData.get('roomName') as string
  console.log("Received FormData:", formData)
  if(!roomName) {
    console.log("Please enter a room name")
    return
  }
  console.log("roomName:", roomName);
  

  const cookieStore = await cookies()
    const user = cookieStore.get('user')
    if(!user) {
      console.log("Please sign in to join a room")  //
      redirect('/sign-in')
        
    }
    const userId = JSON.parse(user.value)._id;
  console.log("userId:", userId);
  if(!roomName) {
    console.log("Please enter a room name")
    return
  }
  const password = formData.get('password') as string
  await connectDB();
  const room = await Room.findOne({ roomName })
  if(!room) {
      console.log("Room not found")
      return
  }
  console.log("room : ", room);
  if(room.password !== password) {
    console.log("Password :", typeof password, password)
    console.log("Password :", typeof room.password, room.password)
    console.log("Wrong password")
    return
  }
  if(room.users.length >= room.maxPeople) {
      console.log("Room is full")
      return
  }
  for (let i = 0; i < room.users.length; i++) {
    if(room.users[i].toString() === userId.toString()) {
      console.log("You are already in this room")
      return
    }
  }
  await Room.updateOne({ roomName }, { $addToSet: { users: userId } })
  console.log("You have joined the room")
  redirect('/rooms')

}