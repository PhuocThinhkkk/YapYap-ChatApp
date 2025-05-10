
import 'server-only'
import connectDB from './mongoDb';
import { getSession, decrypt } from './session';
import User from '@/schema/user';

export async function getUserInSession(){
  const session = await getSession();
  if(!session) return null
  const payload = await decrypt(session)
  if(!payload) return null
  await connectDB()
  const isUserExist = await User.findById(payload.userId)
  if(!isUserExist) return null
  return payload
}