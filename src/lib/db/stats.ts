import 'server-only'
import User from '@/schema/user';
import Room from '@/schema/room';
import connectDB from "@/lib/mongoDb"

export async function getPlatformStats() {
  try {
    await connectDB();
    
    const [totalUsers, totalRooms] = await Promise.all([
      User.countDocuments(),
      Room.countDocuments()
    ]);
    
    return {
      totalUsers,
      totalRooms
    };
  } catch (error) {
    console.error("Failed to fetch platform stats:", error);
    return {
      totalUsers: 0,
      totalRooms: 0
    };
  }
}
