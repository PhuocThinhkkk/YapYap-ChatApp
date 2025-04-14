import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "./LiveChat";

const Page = async ( {params} : {params : Promise<{ roomid : string }>}) => {
  const roomId = (await params).roomid;

  return (
    <div>
      <SocketProvider>
        <LiveChat roomId={roomId}></LiveChat>
     </SocketProvider>
    </div>
   
  )
}

export default Page