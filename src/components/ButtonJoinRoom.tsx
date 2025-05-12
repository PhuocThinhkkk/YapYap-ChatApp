import  Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const ButtonJoinRoom = ({roomId} : {roomId: string}) => {
  return (
    <div>
        <Link href={`/chatrooms/${roomId}`} className=''>
            <Button className='hover:cursor-pointer'>
                Join
            </Button>
        </Link>
    </div>
  )
}

export default ButtonJoinRoom