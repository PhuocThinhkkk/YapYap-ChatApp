import * as z from "zod";
import { formSchema } from "./app/(withSideBar)/home/ButtonEditProfile";
export type UserDB = {
    _id : string;
    name: string,
    email: string ,
    roomsOwn?: [],
    rooms?: [],
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backGroundUrl? : string
}


export type MessageDB = {
	_id?: string
	userId: string,
	roomName: string,
	roomId: string,
	createdAt?: Date,
	info: string;
}





export type UserProfile = {
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
    backGroundUrl? : string
}

export type ContactFormData = z.infer<typeof formSchema>;
