import  Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const ButtonJoinRoom = ({roomName} : {roomName: string}) => {
  return (
    <div>
        <Link href={`/rooms/${roomName}`} className=''>
            <Button className='hover:cursor-pointer'>
                Join
            </Button>
        </Link>
    </div>
  )
}

export default ButtonJoinRoom