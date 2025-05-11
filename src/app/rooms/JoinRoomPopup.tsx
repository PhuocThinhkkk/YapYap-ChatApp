"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  
import { useActionState, useState } from "react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchRoom } from '@/actions'

const initialState = {
    message: '',
}

const JoinRoomPopup = ({
    roomName,  
}: {
    roomName: string,
}) => {
    const [open, setOpen] = useState(false)
    const [dialogKey, setDialogKey] = useState<number>(0)

    const handleOpenChange = (newOpen : boolean) => {
        setOpen(newOpen)
        if (newOpen) {
            setDialogKey((prev) => prev + 1)
        }
    }
    

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
        <DialogTrigger asChild>
            <Button variant="outline" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer' >Join</Button>
        </DialogTrigger>
        {roomName ?
            (
                <DialogContent className='sm:max-w-[425px]' >
                <DialogHeader className='text-center text-4xl font-bold'>
                    <DialogTitle className='text-center'>
                        Join {roomName} room 
                    </DialogTitle>
                    <DialogDescription className='text-center'>
                        Enter the password to join the room:
                    </DialogDescription>

                </DialogHeader>
                  <FormActionSearch key={dialogKey} roomName={roomName}></FormActionSearch>
                    
                </DialogContent>
            ) : null
        
        }
        
    </Dialog>
  )
}

function FormActionSearch ( { roomName } : { roomName : string }) {
    const [state, formAction, pending] = useActionState(SearchRoom, initialState)
    return (
    <form action={formAction} 
        >
        <input type="hidden" name="roomName" value={roomName} />
        { state.message ? <div className="h-5 text-red-600">{state.message}</div> : <div className="h-5"></div> }
        <div className='flex flex-col items-center justify-center'>
            <Input name="password" type="password" placeholder="Password" className='border-2 border-gray-300 rounded-md p-2 mb-4' />
            <Button disabled={pending}
            type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Join Room</Button>
        </div>
    </form>
    )
}

export default JoinRoomPopup