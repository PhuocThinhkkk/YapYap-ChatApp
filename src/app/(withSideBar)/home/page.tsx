import { Suspense } from "react"
import ProfileComponent from "./UserProfile"
import ProfileSkeleton from "./ProfileSkeleton"


const Page = async () => {
  return (
    <>   
    <Suspense fallback={<ProfileSkeleton/>}>
        <ProfileComponent/>
    </Suspense>
    </>
 
  )
}
export default Page