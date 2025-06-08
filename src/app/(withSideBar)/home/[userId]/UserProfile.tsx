'use client'
import {
  useQuery,
} from '@tanstack/react-query'
import { CalendarDays, MapPin, Mail, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ButtonEditProfile from "./ButtonEditProfile"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { UserProfile } from '@/type'
import ProfileSkeleton from './ProfileSkeleton'
import { UIError } from '@/components/ui-error'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'



export default function ProfileComponent() {
  const params = useParams<{ userId: string }>()
  const [userParamsId, setUserParamsId] = useState<string | null>(null)
  const [userCookieId, setUserCookiesId] = useState<string | undefined>(undefined)
  useEffect(()=>{
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const userId = (JSON.parse(userCookie))?._id
      setUserCookiesId(userId)
    }
    setUserParamsId(params.userId)
  },[])                                                                        //eslint-disable-line

  const { data , status, error }  = useQuery({ 
    queryKey: ['UserInfor'],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userParamsId}/profile`)
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok')
      }
      return data;
    },
  })
  if (status == "pending") {
    return <ProfileSkeleton/>
  }
  if (status == "error") {
    return <UIError className="h-full flex justify-center items-center"  title={`There is some errors : ${error}`}/>
  }
  const user : UserProfile = data;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-none shadow-none ">
        {/* Cover Image */}
        <div className="h-48 bg-amber-200 rounded-t-lg relative">
          {user.backgroundUrl ? (
            <Image
              src={user.backgroundUrl }
              alt="user background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : null}
        </div>

        {/* Profile Header */}
        <div className="py-4 px-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
            <Avatar className="relative bottom-5 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-background bg-blue-100">
              <AvatarImage
              src={user.avatarUrl}
              alt="user avt"
              className="object-cover w-full h-full rounded-full"
              />
              <AvatarFallback className="w-full h-full flex justify-center items-center text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pt-4 sm:pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div >
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">
                    {user.role}
                  </p>
                </div>
                <div className="flex gap-2">
                  
                  { userCookieId == userParamsId && <ButtonEditProfile user = {user}/>}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost"  className=" hover:cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Share Profile</DropdownMenuItem>
                      <DropdownMenuItem>Report User</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  Location: 
                        { " " + ( user.location ?? "Unknown") }
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                    Email: 
                        {" "+user.email}
                  
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                    Day creat account: 
                        {" "+user.joinAt}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm">{user.bio}</p>
          </div>

          

          <div className="flex justify-between my-10 border-b w-full">
            <div className="text-center">
              <p className="font-bold text-2xl">{user.roomsLen.toLocaleString()}</p>
              <p className="text-xl text-muted-foreground">Rooms joining</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl">{user.roomsOwnLen.toLocaleString()}</p>
              <p className="text-xl text-muted-foreground">Rooms Owning</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl">{user.messagesSent}</p>
              <p className="text-xl text-muted-foreground">Total Messages Sent</p>
            </div>
          </div>
        </div>

        
      </Card>
    </div>
  )
}
