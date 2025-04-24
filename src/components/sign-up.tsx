
'use client'
import { useActionState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/actions"

const initialState = {
  message: '',
}
export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction, pending] = useActionState(createUser, initialState)
 
  return ( 
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name"
                    type="text"
                    id="name" 
                    placeholder="Enter your name" 
                    required
                    />
                </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email"
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input name="password" 
                  id="password"
                  type="password" required 
                />
              </div>

              {state?.message ? <p className="text-red-500 h-2">{state.message}</p> : <div className="h-2"/>}
              <Button disabled={pending} type="submit" className="w-full">
                Sign up
              </Button>
              <Button disabled={pending} variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


