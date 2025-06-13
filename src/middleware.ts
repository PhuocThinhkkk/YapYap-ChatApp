import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/session'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("middleware start running");
  const isAuth = await getSession();
  if(!isAuth){
    console.log("no session: ", isAuth)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  
  
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard',
    '/chatrooms/:path*',
    ]
}