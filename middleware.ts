// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('session_token')?.value;
//   const path = request.nextUrl.pathname;

//   // Public paths that don't require auth (add your homepage and other marketing pages here)
//   const publicPaths = ['/', '/login', '/reset-password', '/api/auth'];
  
//   // Check if current path is public (exact match or starts with /api/auth)
//   const isPublicPath = publicPaths.some(p => 
//     path === p || (p !== '/' && path.startsWith(p))
//   );

//   // If no token and trying to access protected route
//   if (!token && !isPublicPath) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // If has token and trying to access login, redirect to dashboard (or register if they haven't completed registration)
//   if (token && (path === '/login' || path === '/')) {
//     // Optional: Redirect logged-in users away from homepage to dashboard
//     // Remove this if you want logged-in users to still see the homepage
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)'],
// };











import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const path = request.nextUrl.pathname;

  // Public paths
  const publicPaths = ['/', '/login', '/signup', '/reset-password', '/api/auth'];
  
  const isPublicPath = publicPaths.some(p => 
    path === p || path.startsWith('/api/auth') || path.startsWith('/_next') || path.includes('.')
  );

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check auth for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect logged-in users away from login page
  if (path === '/login' && token) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.).*)'],
};