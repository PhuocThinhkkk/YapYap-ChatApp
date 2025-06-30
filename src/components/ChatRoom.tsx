"use client";
import { useSocket } from '@/components/socketProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, 
{ 	
	FormEvent, 
	useEffect, 
	useState, 
	useRef 
} from 'react';
import { 
	Send, 
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner";
import {
	Avatar, 
	AvatarFallback, 
	AvatarImage 
} from "./ui/avatar";
import { ResponseMessage, RoomDb, UserDB } from "@/type";


export default function ChatRoom( { 
	userId,
	room,
} : { 
	userId : string,
	room : RoomDb,
}) {
	const [messages, setMessages] = useState<ResponseMessage[]>([]);
	const [user, setUser] = useState<UserDB | null>(null)
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
	  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const socket = useSocket();
	useEffect(() => {
		const userFetching = async () => {
			try {

				const resForUser = await fetch(`/api/users/${userId}`, {
					cache: 'force-cache'
				})
				const dataUser = await resForUser.json();
				if(!resForUser.ok ) {
					throw new Error(dataUser.message)
				}
				setUser(dataUser);

			}catch (err) {
				console.error(err)
				toast.error("Failed to get messages");
				return
			}
		}
		const messageFetching = async () => {
			try {

				const resForMessage = await fetch(`/api/rooms/${room._id}/messages`,
					{
						cache: 'no-store',
					}
				);
				const data = await resForMessage.json();
				if(!resForMessage.ok ) {
					throw new Error(data.message)
				}
				const newDate = new Date(data.createdAt)
				data.createAt = newDate
				setMessages(data);

			}catch (err) {
				console.error(err)
				toast.error("Failed to get messages");
				return
			}
		}
		userFetching();
		messageFetching();
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {

		if (!socket) return;
		socket.emit("join_room", room._id);
		socket.on("sendMessage", (message: ResponseMessage) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("sendMessage");
			socket.off('user_joined');
		};

	}, [socket, room._id]);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		try{
			if (!socket) {
				throw new Error('Socket not connected'); 
			}
			
			e.preventDefault();
			const form = e.currentTarget
			const formData = new FormData(form);
			const info = formData.get('message') as string
			if(!info || !user || !room || !room._id || !userId ) {
				console.log(info)
				throw new Error('some information is missing!')
			}
			const now = new Date()
			const message = {
				userId,
				roomId : room._id,
				info,
			}

			const fullInforMessage : ResponseMessage = {
				user,
				room,
				info,
				createdAt: now.toISOString()
			}
			setMessages([...messages, 
				fullInforMessage
			]);
			const res = await fetch(`/api/rooms/${room._id}/messages`,{
				method: "POST",
				body: JSON.stringify(message),
			});
			if(!res.ok ) {
				return  //
			}
			socket.emit('sendMessage',{roomId : room._id, message} );
			form.reset();
		}catch(err){
			toast.error(`Error when sending message: ${err}`)
		}
	}


	return (
		<>
		<div className="flex-1 flex flex-col h-full">
		
		<h1 className="text-center sm:text-left font-bold p-3 px-4  sm:px-15 lg:px-30 mb-5 top-0 sticky bg-white h-12 z-10 border-b text-lg">
			Room: {room.roomName}
		</h1>

		<ScrollArea className="flex-1 h-[calc(100vh-500px)]">
			<div className="px-4 sm:px-8 lg:px-20 py-5">
			<div className="space-y-4 mb-5">
				{messages?.map((message, index) => {
				const showDateHeader = index === 0 || !isSameDay(message.createdAt, messages[index - 1].createdAt)

				return (
					<div key={index}>
					{showDateHeader && (
						<div className="flex justify-center mb-4">
						<div className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
							{formatDate(message.createdAt)}
						</div>
						</div>
					)}

					<div
						className={`flex items-start gap-2 sm:gap-3 ${
						message.user._id === userId ? "justify-end" : "justify-start"
						}`}
					>
						{message.user._id !== userId && (
						<Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
							<AvatarImage src={message.user.avatarUrl || "/placeholder.svg"} alt={message.user.name} />
							<AvatarFallback className="text-xs">
							{message.user.name
								?.split(" ")
								.map((n) => n[0])
								.join("")}
							</AvatarFallback>
						</Avatar>
						)}

						<div
						className={`flex flex-col ${
							message.user._id === userId ? "items-end" : "items-start"
						} min-w-0 flex-1 max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]`}
						>
						<div className="text-xs text-muted-foreground mb-1 px-1">
							{message.user._id !== userId ? message.user.name : "You"}
						</div>

						<div
							className={` max-w-[150px] sm:max-w-[250px] lg:max-w-[500px] inline-block rounded-lg px-3 py-2 sm:px-4 sm:py-2 ${
							message.user._id === userId ? "bg-primary text-primary-foreground" : "bg-muted"
							}`}
						>
							<p className="text-sm break-words hyphens-auto overflow-wrap-anywhere">{message.info}</p>
						</div>

						<div className="text-xs text-muted-foreground mt-1 px-1">{formatTime(message.createdAt)}</div>
						</div>

						{message.user._id === userId && (
						<Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
							<AvatarImage src={message.user.avatarUrl || "/placeholder.svg"} alt={message.user.name} />
							<AvatarFallback className="text-xs">
							{message.user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
							</AvatarFallback>
						</Avatar>
						)}
					</div>
					</div>
				)
				})}
			</div>
			<div ref={endOfMessagesRef} />
			</div>
		</ScrollArea>

		<form
			onSubmit={sendMessage}
			className="flex space-x-2 sticky z-10 bottom-0 px-4 sm:px-8 lg:px-20 py-5 bg-white border-t"
		>
			<Input
				name="message"
				type="text"
				placeholder="Type a message"
				className="flex-1 min-w-0"
			/>
			<Button size="icon" type="submit" className="hover:cursor-pointer flex-shrink-0">
			<Send className="h-4 w-4 sm:h-5 sm:w-5" />
			</Button>
		</form>
		</div>
		</>
	);
}


 function formatDate(dateString : string | undefined) : string {
	if (!dateString) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

 function formatTime(dateString : string | undefined) {
	if (!dateString) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

 function isSameDay(date1String : string | undefined, date2String : string | undefined) {
	
	if (!date1String || !date2String) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date1 = new Date(date1String)
	const date2 = new Date(date2String)
	
    return date1.toDateString() === date2.toDateString()
  }