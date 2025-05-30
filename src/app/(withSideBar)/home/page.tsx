
import { UIError } from '@/components/ui-error'
import { getUserInSession } from "@/lib/auth"
import ProfileComponent from './UserProfile';




const Page = async () => {
  const user = await getUserInSession();
  if (!user) {
    return <UIError className="h-full flex justify-center items-center" title='You dont have session, please sign-in again.' />
  }
  return (
    <> 
      <ProfileComponent userId={user._id}/>
    </>
 
  )
}
export default Page

