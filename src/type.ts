import * as z from "zod";
import { formSchema } from "./components/ButtonEditProfile";


export type UserDB = SimpleUserType & {
    roomsOwn?: RoomDb[],
    rooms?: RoomDb[],
}

export type SimpleUserType = {
    _id : string,
    name : string,
    email : string,
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backrondUrl? : string,
}

export type UserCookie = SimpleUserType & {
    roomsOwnLength?: number,
    roomsLength?: number,
}


export type MessageDB = {
	_id? : string
	user: UserDB,
	room?: RoomDb,
    friendId?: string,
	createdAt? : Date,
	info: string;
}
export type ResponseMessage = {
	_id? : string
	user: UserDB,
	room?: RoomDb,
	createdAt? : string,
	info: string;
    friendId? : string
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
    leaderId: UserDB;
    users: UserDB[];
    createdAt: Date;
    avatarUrl?: string
    description?: string
    category?: string
}


export type FeedbackDb = {
  _id: string
  title: string
  message: string
  rating: number
  user : UserDB
  category: string
  createdAt: Date
}

export type FeedbackFormType = {
    title: string,
    message: string,
    category: string,
    rating : number,
}

export type FriendType = {
    _id : string,
    user1 : SimpleUserType,
    user2 : SimpleUserType,
    createAt : Date,
}

export type FriendUser = {
    _id : string,
    name : string,
    avatarUrl? : string,
    email : string,
    role? : string,
    location? : string,
    friendRelationId : string,
}

export type FriendRequestType = {
    _id : string,
    fromUser : UserDB,
    to : UserDB,
    isNewToTarget : boolean,
    createdAt : Date | string
}

export type UserSearchingType = UserDB & {
    isFriend : boolean,
    isFollowing : boolean,
    isFollower : boolean,
    requestId? : string,
}