import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/session'


 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isAuth = await getSession();
  if(!isAuth){
    console.log("no session: ", isAuth)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  console.log("middleware is running");
  
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/rooms',

    '/rooms/:path*',
    ]
}