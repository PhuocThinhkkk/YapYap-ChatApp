import { LoginForm } from "@/components/login-form"
import image1 from "./sign-in.png"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex min-h-svh w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center ">
        <div className="max-w-md">
          <Image
            src={image1}
            alt="Login illustration"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        {/* Mobile SVG */}
        <div className="mb-8 lg:hidden w">
          <Image
            src={image1}
            alt="Login illustration"
            className="h-40 w-full max-w-sm object-cover mx-auto"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
