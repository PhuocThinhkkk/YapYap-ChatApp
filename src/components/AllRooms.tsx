import { Card, CardContent, } from "@/components/ui/card"
import connectDB from "@/lib/mongoDb"
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "./ui-error"
import { MessageCircle, Users, Zap, TrendingUp } from "lucide-react"
import { RoomDb, UserDB } from "@/type"
import MESSAGE from "@/schema/message"
import RoomCard from "./RoomCard"
import { getUserByIdWithRoom } from "@/lib/db/userdb";



const AllRooms = async () => {
  try {
    const userIdInSession = await getUserIdInSession();
    if (!userIdInSession) {
      return <UIError className="w-full text-center" title="Please sign in to see this page" />
    }
    const user: UserDB = await getUserByIdWithRoom(userIdInSession)
    if (!user) {
      return <UIError className="w-full text-center" title="Please sign in to see your rooms " />
    }

    if (!user.rooms || user.rooms.length == 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No rooms available</p>
          <p className="text-sm text-slate-500">Create the first room to get started!</p>
        </div>)
    }



    return (
      <>

        <RoomsStats rooms={user.rooms} userId={userIdInSession} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {user.rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>

      </>



    )
  } catch (e) {
    console.log(e)
    return <UIError title={`${e}`} />
  }
}


async function RoomsStats({ rooms, userId }: { rooms: RoomDb[]; userId: string }) {
  await connectDB()

  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(24, 0, 0, 0))

  const countMessage = await MESSAGE.countDocuments({
    user: userId,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  })

  const stats = [
    {
      label: "Rooms",
      value: rooms.length,
      desc: "Spaces you created",
      icon: MessageCircle,
      color: "text-brand-900 bg-brand-900/10",
    },
    {
      label: "Capacity",
      value: rooms.reduce((sum, r) => sum + r.maxPeople, 0),
      desc: "Max users allowed",
      icon: Users,
      color: "text-brand-700 bg-brand-700/10",
    },
    {
      label: "Members",
      value: rooms.reduce((sum, r) => sum + r.users.length, 0),
      desc: "People joined",
      icon: TrendingUp,
      color: "text-brand-400 bg-brand-400/10",
    },
    {
      label: "Today Msg",
      value: countMessage,
      desc: "Messages sent today",
      icon: Zap,
      color: "text-brand-900 bg-brand-200/30",
    },
  ]

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="flex items-center gap-1  border-x  px-4 py-3 "
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="text-[10px] text-slate-400">
                  {stat.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllRooms
