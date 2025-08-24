import { Server, Socket } from 'socket.io';

const socketHandler = (socket, io) => {
  console.log('A user connected:', socket.id);
 
  socket.on('join_room', (roomId)=>{
    socket.join(roomId);
    console.log(` user ${socket.id} has joined ${roomId}`)
  } )
  socket.on('sendMessage', ({roomId, message}) => {
    socket.to(roomId).emit('sendMessage', message);
    console.log("message: ",)
  });
 
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
};
 
export default socketHandler;