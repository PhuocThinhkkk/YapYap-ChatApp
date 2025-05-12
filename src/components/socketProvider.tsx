'use client';  

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}
const ServerSocketURL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    console.log("server url : ",ServerSocketURL)
    // const socketInstance = io("http://localhost:3005");  for different server websocket url
    const socketInstance = io(ServerSocketURL);

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket|null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};