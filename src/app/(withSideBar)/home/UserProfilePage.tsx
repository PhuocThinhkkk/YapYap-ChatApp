'use client'
import ProfileComponent from "./UserProfile"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export default function UserProfilePage({userId} : {userId : string}){
  const queryClient = new QueryClient()
  return (
    <> 
      <QueryClientProvider client={queryClient}>
        <ProfileComponent userId ={userId}/>
      </QueryClientProvider>  
    </>
  )
}