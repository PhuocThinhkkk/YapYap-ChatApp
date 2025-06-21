import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/session'


const rateLimitWindow = 60 * 1000; // 1 minute
const maxRequests = 10;
const ipStore = new Map<string, { count: number; time: number }>();
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) { 
  const path = req.nextUrl.pathname;
  console.log(path)
  const isApiRoute = path.startsWith('/api');

  if (!isApiRoute) {
    console.log("middleware start running");
    const isAuth = await getSession();
    if(!isAuth){
      console.log("no session: ", isAuth)
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    return NextResponse.next();
  }

  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] ?? 'unknown';

  console.log('Client IP:', ip);

  const currentTime = Date.now();
  const record = ipStore.get(ip);

  if (record  &&  currentTime - record.time < rateLimitWindow) {
    
    if (record.count >= maxRequests) {
      return NextResponse.json({message: 'Too many requests'}, { status: 429 });
    } else {
      record.count += 1;
    }
  } else {
    ipStore.set(ip, { count: 1, time: currentTime });
  }

  return NextResponse.next();
  
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard',
    '/chatrooms/:path*',
    '/api/:path*',
    ]
}