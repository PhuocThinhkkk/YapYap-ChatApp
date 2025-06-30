import type { MetadataRoute } from 'next'
import type { RoomDb } from '@/type'
import connectDB from '@/lib/mongoDb'
import dotenv from 'dotenv';
import Room from '@/schema/room';

dotenv.config();
const BASE_URL = process.env.URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const rooms : RoomDb[] = await Room.find()
  
  return rooms.map((room) => ({
    url: `${BASE_URL}/chatrooms/${room._id.toString()}`,
    lastModified: room.createdAt,
  }))
}