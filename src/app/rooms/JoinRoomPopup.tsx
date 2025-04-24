
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchRoom } from '@/actions'


const JoinRoomPopup = ({
    roomName,  
}: {
    roomName: string,
}) => {
   
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className='bg-blue-500 text-white px-4 py-2 rounded-md' >Join</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader className='text-center text-2xl font-bold'>
                <DialogTitle className='text-center'>
                    Join {roomName} room 
                </DialogTitle>
                <DialogDescription className='text-center'>
                    Enter the password to join the room:
                </DialogDescription>

            </DialogHeader>
            
                <form action={SearchRoom}
                >
                    <input type="hidden" name="roomName" value={roomName} />
                    <div className='flex flex-col items-center justify-center'>
                        <Input name="password" type="password" placeholder="Password" className='border-2 border-gray-300 rounded-md p-2 mb-4' />
                        <Button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Join Room</Button>
                    </div>
                </form>
                
            </DialogContent>
        
    </Dialog>
  )
}

export default JoinRoomPopup