'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import BananaLoading from './BananaLoading'
type ButtonJoinRoomProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  roomId: string;
};


const ButtonJoinRoom = ({ roomId, disabled, ...props }: ButtonJoinRoomProps) => {
  const [isRedirect, setIsRedirect] = useState(false)
  const route = useRouter()
  async function handleOnclick(){
    setIsRedirect(true)
    route.push(`/chatrooms/${roomId}`)
  }
  return (
    <>
    <Button 
    disabled={disabled} 
    onClick={handleOnclick} 
    className='hover:cursor-pointer'
    {...props} >
        Join
    </Button>
    <BananaLoading isRedirect={isRedirect}/>
    </>   
    
    
  )
}

export default ButtonJoinRoom