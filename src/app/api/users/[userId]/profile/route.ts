import connectDB from "@/lib/mongoDb";
import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinataConfig"
import { ContactFormData } from "@/type";
import MESSAGE from "@/schema/message";
import User from "@/schema/user";
import { UserDB, UserProfile } from "@/type";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getUserIdInSession } from "@/lib/session";

export async function POST(request: NextRequest, { params } : {params: Promise<{userId: string}>}) {
  try {
    const userIdParams  = (await params).userId
    await connectDB()
    const userInParams = await User.findById(userIdParams).select('-password');
    if (!userInParams) {
      return NextResponse.json({message: "No user like this. "}, { status: 404 });
    }
    const userIdInSession = await getUserIdInSession();
    if (userIdInSession !== userIdParams) {
      return NextResponse.json({message: "Unathorize! "}, { status: 401 });
    }

    const data = await request.formData();
    const avatarfile = data.get("avatarImg")
    const backgroundfile = data.get("backgroundImg");
    const userName = data.get("userName");
    const userBio = data.get("userBio");
    console.log("form in route handler: ", data)
    if (avatarfile instanceof File) {
      console.log("avatarfile name: ", avatarfile?.name)
      console.log("avatarfile size: ", avatarfile?.size)
      console.log("avatarfile type: ", avatarfile?.type)
    } else {
      console.log("⚠️ Not a avatarfile. Type is:", typeof avatarfile, avatarfile);
    } 
    let url = "No url."
    if(avatarfile){
      const userProfileImage : ContactFormData["avatarImg"] = avatarfile;
      const { cid } = await pinata.upload.public.file(userProfileImage)
      url = await pinata.gateways.public.convert(cid);

      await User.updateOne(
        {_id : userIdInSession},
        { $set: {avatarUrl : url}}
      )
    }
    if(backgroundfile){
      const userBackgroundImage : ContactFormData["backgroundImg"] = backgroundfile;
      const { cid } = await pinata.upload.public.file(userBackgroundImage)
      url = await pinata.gateways.public.convert(cid);

      await User.updateOne(
        {_id : userIdInSession},
        { $set: { backgroundUrl: url } }
      )
    }
    if (userName) {
      await User.updateOne(
        {_id : userIdInSession},
        { $set: {name: userName}}
      )
    }
    if (userBio) {
      await User.updateOne(
        {_id : userIdInSession},
        { $set: {bio: userBio}}
      )
    }

   
    return NextResponse.json({message: "success!"}, { status: 200 });
  } catch (e) {
    console.log("server err: ",e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params } : {params: Promise<{userId: string}>}) {
  try{
    const { userId } = await params
    await connectDB()
    const userdb = await User.findById(userId).select('-password');
    if (!userdb) {
      return NextResponse.json({message: "No user like this. "}, { status: 404 });
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
    return NextResponse.json(result, { status: 200 });
  }catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}