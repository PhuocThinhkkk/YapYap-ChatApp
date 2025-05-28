
import { UIError } from '@/components/ui-error'
import { getUserInSession } from "@/lib/auth"
import UserProfilePage from './UserProfilePage';



const Page = async () => {
  const user = await getUserInSession();
  if (!user) {
    return <UIError className="h-full flex justify-center items-center" title='You dont have session, please sign-in again.' />
  }
  return (
    <> 
      <UserProfilePage userId={user._id}/>
    </>
 
  )
}
export default Page

