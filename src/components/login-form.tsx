'use client'
import { useActionState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {signIn} from "@/actions"

const initialState = {
  message: '',
}
 

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction, pending] = useActionState(signIn, initialState)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              {state?.message ? <p className="text-red-500 h-3">{state.message}</p> : <div className="h-3"/>}
              <Button disabled={pending} type="submit" className="w-full hover:cursor-pointer">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Sign Up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

