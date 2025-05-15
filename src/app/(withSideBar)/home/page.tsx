import { Suspense } from "react"
import ProfileComponent from "./UserProfile"
import ProfileSkeleton from "./ProfileSkeleton"


export const page = async () => {
  return (
    <Suspense fallback={<ProfileSkeleton/>}>
        <ProfileComponent/>
    </Suspense>
  )
}

export default page