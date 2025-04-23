import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "./LiveChat";

const Page = async ( {params} : {params : Promise<{ roomid : string }>}) => {
  const roomId = (await params).roomid;
  const url = process.env.URL;
  const res = await fetch(`${url}/api/rooms/${roomId}`);
  if(res.status !== 200) {
 
    console.log("status code :", res.status);
    console.log("there is sth wrong in server! ");
    return
  }
  const data = await res.json();
  console.log("room data :", data);
  if(!data) return null;
  const roomName = data.roomName;

  return (
    <div>
      <SocketProvider>
        <LiveChat  roomId={roomId} roomName={roomName}></LiveChat>
     </SocketProvider>
    </div>
   
  )
}

export default Page