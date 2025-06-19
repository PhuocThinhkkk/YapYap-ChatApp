'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import BananaLoading from './BananaLoading'

const ButtonJoinRoom = ({roomId} : {roomId: string}) => {
  const [isRedirect, setIsRedirect] = useState(false)
  const route = useRouter()
  async function handleOnclick(){
    setIsRedirect(true)
    route.push(`/chatrooms/${roomId}`)
  }
  return (
    <>
    <Button onClick={handleOnclick} className='hover:cursor-pointer'>
        Join
    </Button>
    <BananaLoading isRedirect={isRedirect}/>
    </>   
    
    
  )
}

export default ButtonJoinRoom