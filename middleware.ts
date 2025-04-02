import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Middleware executed");

  // Check if the user is authenticated
  const isAuthenticated = checkAuth(request);

  // Define the routes where authenticated users should be redirected
  const authRoutes = ['/login']; 

  // If the request is for the sign-in or sign-up route and the user is authenticated
  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // For other routes, if the user is not authenticated, redirect to the sign-in page
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

function checkAuth(request: NextRequest): boolean {
  // Get the access_token from the cookies
  const token = request.cookies.get('token');
  console.log("token", token);
  // Check if the token exists
  return token ? true : false;
}

// See "Matching Paths" below to learn more
export const config = {

  matcher: ['/dashboard','/leads','/deals','/resourcelist','/overallvendorprofile','/overallcasrstudy','/todolist','/individualmeetingscreen'],
  


};
    