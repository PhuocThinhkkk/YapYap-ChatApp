import React from 'react'
import LiveChat from '../rooms/[roomid]/LiveChat'
import { SocketProvider } from '@/components/socketProvider'

const Page = () => {
  return (
    <div>
        <SocketProvider>
            <LiveChat roomId='100'></LiveChat>
        </SocketProvider>
        
    </div>
  )
}

export default Page