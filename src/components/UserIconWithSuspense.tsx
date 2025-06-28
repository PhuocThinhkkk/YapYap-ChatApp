import { Suspense } from "react";
import { Loader2 } from 'lucide-react';
import  UserIconSignIn  from "@/components/UserIconSignIn"
import NotificationBell from "@/components/notification";


const UserIconWithSuspense = () => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin text-primary h-10 w-10" />}>
      <div className="flex flex-row">
        <NotificationBell/>
        <UserIconSignIn/>
        </div>
    </Suspense>
  )
}

export default UserIconWithSuspense