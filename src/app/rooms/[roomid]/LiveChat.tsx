"use client";
import  Cookie  from "js-cookie";
import { useSocket } from '@/components/socketProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FormEvent, useEffect, useState, useRef } from 'react';
import { Send, SidebarOpenIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import LeftSideBar from "./LeftSideBar";

interface Message {
	_id?: string
	userId: string,
	roomName: string,
	info: string;
}

export default function LiveChat( {roomId} : {roomId : string} ) {
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [messages, setMessages] = useState<Message[]>([]);
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
	  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
  
	const [userId, setUserId] = useState<string | null>(null);
	const socket = useSocket();
	useEffect(() => {
		const userCookie = Cookie.get("user");
		if (userCookie) {
			const parsed = JSON.parse(userCookie);
			setUserId(parsed._id);
			console.log("user cookie :", parsed._id);
		}
		const fetchMessages = async () => {
			try {
			  const res = await fetch(`/api/rooms/${roomId}`,
				{
					cache: 'no-store',
				}
			  )
			  const data = await res.json();
			  if(res.status != 200 ) {
				console.log(data)
				return;
			}
			  setMessages(data); 
			} catch (err) {
			  console.error("Failed to fetch messages:", err);
			}
		};
		fetchMessages();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {

		if (!socket) return;
		console.log("Socket connected");
		socket.emit("join_room", roomId);
		socket.on("sendMessage", (message: Message) => {
			console.log("message received: ",message);
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("sendMessage");
			socket.off('user_joined');
		};

	}, [socket, roomId]);

	if(!userId) return null;
	
	console.log("user cookie :",userId)
	console.log(Cookie.get());

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
	try{
		if (!socket) {
			alert('Socket not connected');
			return;
		}
		
		e.preventDefault();
		const form = e.currentTarget
		const formData = new FormData(form);
		const info = formData.get('message') as string
		if(!info) return;
		const message : Message = {
			userId,
			roomName : roomId,
			info,
		}
		console.log(message)
		const res = await fetch(`/api/rooms/${roomId}`,{
			method: "POST",
			body: JSON.stringify(message),
		});
		if(res.status !== 200 ) {
			console.log("there is sth wrong in server! ");
			return
		}
		socket.emit('sendMessage',{roomId, message} );
		setMessages([...messages, 
			message
		]);

		form.reset();
	}
	catch(err){
		console.log(err);
	}
	}
	

	return (
		<>
		 <div className="flex h-screen w-screen">
			<div className="fixed top-8 left-4 z-30 lg:hidden border rounded-sm">
				<Button className="bg-white hover:bg-slate-100 text-black text-sm" onClick={()=> setIsOpen(!isOpen)}>
					<SidebarOpenIcon/>
				</Button>
			</div>
			<LeftSideBar isOpen={isOpen}/>
			<div className="grid-cols-1 flex-1 h-screen">
				<h1 className="text-left font-bold p-3 pl-16 mb-5 top-0 sticky bg-white h-12 z-10 border-b text-lg "> Room : {roomId}</h1>
				<ScrollArea  className="h-[calc(100vh-200px)] ">
				<div className="px-20 py-5">
					<div className="space-y-10 mb-5">
						{messages.map((message, index) => (
							 <div key={index} className={`flex ${message.userId == userId ? "justify-end" : "justify-start"}`}>
								<div
								className={`max-w-[70%] rounded-lg px-4 py-2 ${
									message.userId == userId ? "bg-primary text-primary-foreground" : "bg-muted"
								}`}
								>
								<p>{message.info}</p>
								
								</div>
							</div>
						))}
					</div>
					<div ref={endOfMessagesRef} />
				</div>
				</ScrollArea>
				<form onSubmit={sendMessage} className="flex space-x-2 sticky z-10 bottom-5 px-20 py-5">
						<Input type="text" name='message' placeholder="Type a message" />
						<Button size="icon" >
							<Send className="h-5 w-5" />
						</Button>
				</form>
			</div>
		</div>
		
		</>
	);
}
