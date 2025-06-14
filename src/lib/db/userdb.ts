import 'server-only'
import { UserDB } from '@/type';
import User from '@/schema/user';
import connectDB from "@/lib/mongoDb"

export async function getUserById(id : string) : Promise<UserDB | null> {
    await connectDB()
    const userdb = await User.findById(id).select('-password')
    if (!userdb) {
        return null
    }
    const user = JSON.parse(JSON.stringify(userdb)) 
    const createdAt = new Date(user.createdAt)
    user.createdAt = createdAt
    return user as UserDB
}