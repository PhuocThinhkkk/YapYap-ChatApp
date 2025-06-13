"use client"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Lock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Cookie from "js-cookie"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

const formSchema = z.object({
  roomName: z
    .string()
    .min(3, { message: "Room name must be at least 3 characters" })
    .max(50, { message: "Room name must be less than 50 characters" }),
  password: z.string().min(1, { message: "Password must be at least 6 characters" }),
  confirmPassword : z.string(),
  maxPeople: z.enum(["5", "10", "50", "100"], {
    required_error: "Please select the maximum number of participants",
  }),
})

const freeOptions = [
  { value: "5", label: "5 people", description: "Small group" , tier: "free" },
  { value: "10", label: "10 people", description: "Medium group" , tier: "free" },
  
]
const premiumOptions = [
  { value: "25", label: "25 people", description: "Large group", tier: "pro" },
  { value: "50", label: "50 people", description: "Community", tier: "pro" },
  { value: "100", label: "100 people", description: "Public room", tier: "pro" },
]


export function CreateChatForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPremium, setIsPremium] = useState<boolean | null>(null)
  const [isRedirect, setIsRedirect] = useState(false)

  useEffect(()=>{
    try {
      const userCookie = Cookie.get('user')
      if (!userCookie) {
        throw new Error("Please sign in to continue")
      }
      const user = JSON.parse(userCookie);
      if (!user?.role) {
        throw new Error("Please sign in to continue")
      }
      setIsPremium(user.role != "Free Plan")
    } catch (error) {
      toast.error(`${error}`)
    }
    
  },[])

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      password: "",
      confirmPassword: "",
      maxPeople: "10",
    },
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true)
  
  try {
    // Here you would typically send the data to your backend
    
    const roomName = values.roomName;
    const password = values.password;
    const confirmPassword = values.confirmPassword;
    const maxPeople = values.maxPeople;
    if(password !== confirmPassword){
      throw new Error( "your confirm password didnt match!" );
    }
  
    const room = {
      roomName,
      password,
      maxPeople,
    }
    
    const response = await fetch("/api/rooms/create-room", 
      {
        method: "POST",
        body: JSON.stringify(room),
        credentials: 'include'
      }
    );
    const data = await response.json();


    if( !response.ok ) {
      throw new Error(`${data.message}`)
    }
    router.push('/rooms')
    // Redirect to the newly created chat room (this is just a placeholder)
    // router.push(`/chat/${encodeURIComponent(values.roomName)}`);

    
    
    form.reset()
  } catch (error) {
    toast.error(`Error when creating room: ${error}`)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="roomName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Private Chat" {...field} />
                </FormControl>
                <FormDescription>This is the name that will be displayed to participants.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="password" placeholder="Enter a secure password" {...field} />
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormDescription>Participants will need this password to join the chat.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <div className="relative">
                    <Input type="password" placeholder="Enter your password again" {...field} />
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Participants</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select maximum number of participants" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      {freeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {option.description}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}

                      {/* Show disabled options for free users */}
                      {!isPremium ? (
                        <>
                          <SelectItem value="25" disabled>
                            <div className="flex items-center justify-between w-full opacity-50">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <span>25 people</span>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs border-orange-200 text-orange-600">
                                Pro Plan
                              </Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="50" disabled>
                            <div className="flex items-center justify-between w-full opacity-50">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <span>50 people</span>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs border-orange-200 text-orange-600">
                                Pro Plan
                              </Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="100" disabled>
                            <div className="flex items-center justify-between w-full opacity-50">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <span>100 people</span>
                              </div>
                              <Badge variant="outline" className="ml-2 text-xs border-purple-200 text-purple-600">
                                Enterprise
                              </Badge>
                            </div>
                          </SelectItem>
                        </>
                      ) :  premiumOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {option.description}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                </Select>
                <FormDescription>Choose how many people can join this chat room.</FormDescription>
                {!isPremium && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-orange-700">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Want larger rooms?</span>
                      </div>
                      <p className="text-xs text-orange-600 mt-1">
                        Upgrade to Pro for up to 50 participants or Enterprise for up to 100 participants.
                      </p>
                      <Button 
                        disabled={isRedirect}
                        onClick={()=>{
                          setIsRedirect(true);
                          router.push("/role");
                        }}
                        variant="outline"
                        size="sm"
                        className="hover:cursor-pointer mt-2 h-7 text-xs border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Private Chat"}
          </Button>
        </form>
      </Form>
    </Card>
  )
}

