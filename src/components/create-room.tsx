"use client"

import { useState } from "react"
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

export function CreateChatForm() {
  const [isLoading, setIsLoading] = useState(false)
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
    console.log("Form submitted:", values)
    const roomName = values.roomName;
    const password = values.password;
    const confirmPassword = values.confirmPassword;
    const maxPeople = values.maxPeople;
    if(password !== confirmPassword){
      alert(`your confirm password didnt match!`)
      throw "your confirm password didnt match!"
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
    const res = await response.json();

    console.log("where tf this func run on Server/Client?")
    if(response.status !== 200) {
      return alert(`${res.message}`)
    }
    router.push('/rooms')
    // Redirect to the newly created chat room (this is just a placeholder)
    // router.push(`/chat/${encodeURIComponent(values.roomName)}`);

    
    console.log(`Chat room "${values.roomName}" created successfully!`)
    form.reset()
  } catch (error) {
    console.error("Error creating chat room:", error)
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
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>5 people</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="10">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>10 people</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="50">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>50 people</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="100">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>100 people</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose how many people can join this chat room.</FormDescription>
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

