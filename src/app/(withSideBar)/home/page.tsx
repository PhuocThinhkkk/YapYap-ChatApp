
import { UIError } from '@/components/ui-error'
import { getUserIdInSession } from "@/lib/session"
import ProfileComponent from './UserProfile';




const Page = async () => {
  const userId = await getUserIdInSession();
  if (!userId) {
    return <UIError className="h-full flex justify-center items-center" title='You dont have session, please sign-in again.' />
  }
  return (
    <> 
      <ProfileComponent userId={userId}/>
    </>
 
  )
}
export default Page

