import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/session'


 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isAuth = await getSession();
  if(!isAuth){
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  if(request.nextUrl.pathname.startsWith('/rooms/[roomid]')){
    return
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/rooms',
    '/api/rooms/create-room',
    '/rooms/[roomid]',
    '/rooms/create-room'
    ]
}