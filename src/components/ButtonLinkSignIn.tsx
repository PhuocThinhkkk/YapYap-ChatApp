"use client"
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'

const ButtonLinkSignIn = () => {
    const [isLoading, setIsLoading] = useState(false)
  return (
    <Link href="/sign-in" onClick={()=>{
        setIsLoading(true)
    }}>
        <Button disabled={isLoading} className='hover:cursor-pointer text-black hover:text-white bg-slate-100 hover:bg-slate-700'>SignIn</Button>
    </Link>
  )
}

export default ButtonLinkSignIn