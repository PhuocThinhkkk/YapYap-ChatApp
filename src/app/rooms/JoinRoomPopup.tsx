
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import connectDb from '@/lib/mongoDb'
import Room from '@/schema/room'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const JoinRoomPopup = async ({
    roomName, //eslint-disable-line @typescript-eslint/no-unused-vars   
    roomId, 
    maxPeople, 
    users
}: {
    roomName: string,
    roomId: string,
    maxPeople: number,
    users: string[]
}) => {
    const cookieStore = await cookies()
    const user = cookieStore.get('user')
    if(!user) {
        alert("Please sign in to join a room")  //
        redirect('/sign-in')
        
    }
    const userId = JSON.parse(user.value)._id;
   
  return (
    <div className='fixed translate-x-1/2 translate-y-1/2 top-1/2 left-1/2'>
        <Card>
            <CardHeader className='text-center text-2xl font-bold'>
                <CardTitle className='text-center'>
                    <AvatarFallback className='text-center'>
                        {roomName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                    Join ${roomName} room 
                </CardTitle>
                <CardDescription className='text-center'>
                    Enter the password to join the room:
                </CardDescription>

            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center'>
                <form action={async (formData: FormData) => {
                    'use server'
                    if(users.length >= maxPeople) {
                        alert("Room is full")
                        return
                    }
                    const password = formData.get('password') as string
                    await connectDb();
                    const room = await Room.findOne({ _id: roomId})
                    if(!room) {
                        alert("Room not found")
                        return
                    }
                    if(room.password !== password) {
                        alert("Wrong password")
                        return
                    }
                    
                    await Room.updateOne({ _id: roomId }, { $addToSet: { users: userId } })
                    alert("You have joined the room")
                    redirect('/rooms')

                }}
                >
                    <div className='flex flex-col items-center justify-center'>
                        <Input type="password" placeholder="Password" className='border-2 border-gray-300 rounded-md p-2 mb-4' />
                        <Button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Join Room</Button>
                    </div>
                </form>
                
            </CardContent>
        </Card>
    </div>
  )
}

export default JoinRoomPopup