"use server"
import connectDB from "./lib/mongoDb"
import User from "@/schema/user";
import { createSession, getSession } from "./lib/session"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"


export const createUser = async (_prevState : unknown ,formData : FormData) =>{
  
  console.log("Received FormData:", formData)
  const validatedFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
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
  await createSession(user._id)
  console.log("new user sign up successfully");
  const session1 = await getSession();
  console.log("get session:", session1);
  const cookieStore = await cookies();
  cookieStore.set('user', user);
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
  const isUserExist = await User.findOne({email : userForm.email});
  
  if(!isUserExist){
    console.log("no user with that email in db");
    return {message: 'Your email is not correct !'};
  }

  const isPassWordCorrect = isUserExist.password === userForm.password;
  if(!isPassWordCorrect){
    console.log("password is not correct");
    return {message: 'Your password is not correct !'};
  }

  await createSession(isUserExist._id);
  console.log("user sign in successfully");
  const cookieStore = await cookies();
  cookieStore.set('user', JSON.stringify(isUserExist)
    
  )
  redirect("/");
}