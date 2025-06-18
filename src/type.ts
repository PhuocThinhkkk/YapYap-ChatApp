import * as z from "zod";
import { formSchema } from "./app/(withSideBar)/users/[userId]/ButtonEditProfile";
export type UserDB = {
    _id : string;
    name: string,
    email: string ,
    roomsOwn?: RoomDb[],
    rooms?: RoomDb[],
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}

export type UserCookie = {
    _id : string;
    name: string,
    email: string ,
    roomsOwnLength?: number,
    roomsLength?: number,
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}


export type MessageDB = {
	_id? : string
	user: UserDB,
	room: RoomDb,
	createdAt? : Date,
	info: string;
}
export type ResponseMessage = {
	_id? : string
	user: UserDB,
	room: RoomDb,
	createdAt? : string,
	info: string;
}


//for area chart
export type roomMessageChartData = {
    date: string,
    dayInWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"| "Sunday",
    yourRoom: number,
    orthersRoom: number,
}

export type resPieChart = {
    id : string,
    roomName : string,
    count : number,
    fill : string,
}
  
export type resBigChart = {
    date : string,
    count : number,
}


export type UserProfile = {
    _id : string,
    name: string ,
    email: string ,
    roomsOwnLen: number,
    roomsLen: number,
    joinAt : string,
    messagesSent : number,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}

export type ContactFormData = z.infer<typeof formSchema>;


export type RoomDb = {
  _id: string;
  roomName: string;
  maxPeople: number,
  leaderId: string;
  users: UserDB[];
  createdAt: Date;
}


export type FeedbackDb = {
  _id: string
  title: string
  message: string
  rating: number
  user : UserDB
  category: string
  createdAt: string
}

export type FeedbackFormType = {
    title: string,
    message: string,
    category: string,
    ratting : number,
}
