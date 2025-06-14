import { Suspense } from "react";
import { Loader2 } from 'lucide-react';
import  UserIconSignIn  from "@/components/UserIconSignIn"


const UserIconWithSuspense = () => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin text-primary h-10 w-10" />}>
        <UserIconSignIn/>
    </Suspense>
  )
}

export default UserIconWithSuspense