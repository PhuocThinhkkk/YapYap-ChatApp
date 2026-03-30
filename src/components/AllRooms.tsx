import { Card, CardContent,} from "@/components/ui/card"
import connectDB from "@/lib/mongoDb"
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "./ui-error"
import { MessageCircle, Users, Zap, TrendingUp } from "lucide-react"
import { RoomDb, UserDB } from "@/type"
import MESSAGE from "@/schema/message"
import RoomCard from "./RoomCard"
import { getUserByIdWithRoom } from "@/lib/db/userdb";



const AllRooms = async () => {
  try{
    const userIdInSession = await getUserIdInSession();
    if(!userIdInSession) {
      return <UIError className="w-full text-center" title="Please sign in to see this page"/>
    }
    const user : UserDB  = await getUserByIdWithRoom(userIdInSession)
    if(!user) {
      return <UIError className="w-full text-center" title="Please sign in to see your rooms "/>
    }

    if(!user.rooms || user.rooms.length == 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No rooms available</p>
          <p className="text-sm text-slate-500">Create the first room to get started!</p>
        </div>)
    }
    
    
    
    return (
    <>

      <RoomsStats rooms={user.rooms} userId={userIdInSession}/>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {user.rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    
    </>  
   
       
        
    )
  }catch(e){
    console.log(e)
    return <UIError title={`${e}`}/>
  }
}

async function RoomsStats ({ rooms, userId } : { rooms : RoomDb[], userId : string}) {
  await connectDB()
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(24, 0, 0, 0));

  const countMessage = await MESSAGE.countDocuments({
    user: userId,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay
    }
});
  return (
    <div className="mb-8">
      <Card className="bg-white border border-brand-100/30 shadow-sm overflow-hidden rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-brand-100/30">
          
          <div className="p-4 sm:p-6 flex items-center gap-4 bg-brand-100/5 hover:bg-brand-100/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-900/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-brand-900" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Total Rooms</p>
              <p className="text-2xl font-bold text-slate-800">{rooms.length}</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 flex items-center gap-4 bg-white hover:bg-brand-100/5 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-700/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-brand-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Maximum Users</p>
              <p className="text-2xl font-bold text-slate-800">{rooms.reduce((sum, room) => sum + room.maxPeople, 0)}</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 flex items-center gap-4 bg-brand-100/5 hover:bg-brand-100/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-400/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Total Members</p>
              <p className="text-2xl font-bold text-slate-800">{rooms.reduce((sum, room) => sum + room.users.length, 0)}</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 flex items-center gap-4 bg-white hover:bg-brand-100/5 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-200/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-brand-900" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Messages Today</p>
              <p className="text-2xl font-bold text-slate-800">{countMessage}</p>
            </div>
          </div>

        </div>
      </Card>
    </div>

  )
}

export default AllRooms
