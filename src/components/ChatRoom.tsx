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
import { ResponseMessage, RoomDb, UserDB } from "@/type";
import Message from './Message';
import { formatDate, isSameDay } from '@/lib/utils';

export default function ChatRoom( { 
	user,
	room,
} : { 
	user : UserDB,
	room : RoomDb,
}) {
	const [messages, setMessages] = useState<ResponseMessage[]>([]);
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
	  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const socket = useSocket();
	useEffect(() => {
		
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
			if(!info || !user || !room || !room._id ) {
				console.log(info)
				throw new Error('some information is missing!')
			}
			console.log(user)
			const now = new Date()
			const message = {
				userId: user._id,
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
			socket.emit('sendMessage',{roomId : room._id, fullInforMessage} );
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
						<Message message={message} user={user}/>
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

