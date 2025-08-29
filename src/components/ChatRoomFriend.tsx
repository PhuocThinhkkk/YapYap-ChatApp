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
import { ResponseMessage, SimpleUserType } from "@/type";
import Message from './Message';
import { formatDate, isSameDay } from '@/lib/utils';
import { ChatUserHeader } from './chat-user-header';

export default function ChatRoomFriend( { 
    currentUser,
    ortherUser,
    friendId,
    FriendRoom,
} : { 
    currentUser : SimpleUserType,
    ortherUser : SimpleUserType,
    friendId : string,
    FriendRoom : string,
}) {
	const [messages, setMessages] = useState<ResponseMessage[] | null>(null);
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
	  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const socket = useSocket();
	useEffect(() => {
		
		const messageFetching = async () => {
			try {
                if (!ortherUser || !currentUser ) {
                    toast.error("Some information is missing!")
                    return
                }
                if(!ortherUser._id || !currentUser._id ){
                    console.error("how tf some id is missing", currentUser, ortherUser)
                    toast.error("Some information is missing!")
                    return
                }
				const resForMessage = await fetch(`/api/friends/${friendId}/messages`,
					{
						cache: 'no-store',
					}
				);
				const data = await resForMessage.json();
				if(!resForMessage.ok ) {
					throw new Error(data.message)
				}
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
		socket.emit("join_room", FriendRoom);
		socket.on("sendMessage", (message: ResponseMessage) => {
            setMessages((prevMessages) => [...(prevMessages ?? []), message]);
		});

		return () => {
			socket.off("sendMessage");
			socket.off('user_joined');
		};

	}, [socket, FriendRoom]);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		try{
            
			if (!socket) {
				throw new Error('Socket not connected'); 
			}
			if (messages === null) {
                return
            }
			e.preventDefault();
			const form = e.currentTarget
			const formData = new FormData(form);
			const info = formData.get('message') as string
            if(!info || info.trim() === '') {
                return
            }
			if(!currentUser || !ortherUser || !FriendRoom || !friendId ) {
				throw new Error('some information is missing!')
			}
			const now = new Date()
			const message = {
				userId: currentUser._id,
                friendId,
				info,
			}

			const fullInforMessage : ResponseMessage = {
				user : currentUser,
				info,
                friendId,
				createdAt: now.toISOString()
			}
			setMessages([...messages, 
				fullInforMessage
			]);

			socket.emit('sendMessage',{roomId : FriendRoom, message} );

			const res = await fetch(`/api/friends/${friendId}/messages`,{
				method: "POST",
				body: JSON.stringify(message),
			});
			if(!res.ok ) {
                const data = await res.json()  as {message : string};
                throw new Error(data.message)
			}
			form.reset();
		}catch(err){
			toast.error(`Error when sending message: ${err}`)
		}
	}


	return (
		<>
		<div className="flex-1 flex flex-col h-full">
		
		<ChatUserHeader user={ortherUser}/>

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
						<Message message={message} user={currentUser}/>
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

