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

export async function POST(request: NextRequest) {
  try {
    const data : ContactFormData = await request.json();
    const userProfileImage : ContactFormData["adImage"] = data.adImage
    const { cid } = await pinata.upload.public.file(userProfileImage)
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
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