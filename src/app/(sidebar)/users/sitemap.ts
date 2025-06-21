import type { MetadataRoute } from 'next'
import User from '@/schema/user'
import { UserDB } from '@/type'
import connectDB from '@/lib/mongoDb'
import dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const users : UserDB[] = await User.find()
  
  return users.map((user) => ({
    url: `${BASE_URL}/users/${user._id.toString()}`,
    lastModified: user.createdAt,
  }))
}