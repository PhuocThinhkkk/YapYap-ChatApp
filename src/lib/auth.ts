import 'server-only'
import connectDB from './mongoDb';
import { getSession, decrypt } from './session';
import User from '@/schema/user';
import { UserDB } from '@/type';

export async function getUserDbInSession(){
  const session = await getSession();
  if(!session) return null
  const payload = await decrypt(session)
  if(!payload) return null
  await connectDB()
  const data = await User.findById(payload.userId).lean()
  if(!data) return null
  const user : UserDB = JSON.parse(JSON.stringify(data));
  return user;
}