import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);

  // Get stored tokens from cookies
  const token = request.cookies.get("token")?.value;
  const userDataCookie = request.cookies.get("userData")?.value;

  console.log("Token from cookie:", token ? "Found" : "Not found");
  console.log("User data from cookie:", userDataCookie ? "Found" : "Not found");

  // Define protected routes
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/leads") ||
    request.nextUrl.pathname.startsWith("/deals") ||
    request.nextUrl.pathname.startsWith("/resourcelist") ||
    request.nextUrl.pathname.startsWith("/overallvendorprofile") ||
    request.nextUrl.pathname.startsWith("/overallcasestudy") ||
    request.nextUrl.pathname.startsWith("/todolist") ||
    request.nextUrl.pathname.startsWith("/individual") ||
    request.nextUrl.pathname.startsWith("/individualmeetingscreen");

  // Define auth routes (login, callback, etc.)
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.includes("/oauth-callback");

  // Check if current route is the OAuth callback
  const isOAuthCallback = request.nextUrl.pathname.includes("/oauth-callback");

  // For OAuth callback route, always allow access as it will handle authentication
  if (isOAuthCallback) {
    console.log("OAuth callback detected, allowing access");
    return NextResponse.next();
  }

  console.log("Route information:", {
    path: request.nextUrl.pathname,
    isProtected: isProtectedRoute,
    isAuthRoute: isAuthRoute,
  });

  // Check if user is authenticated via cookie
  const isAuthenticated = !!token;
  console.log(
    "Cookie authentication status:",
    isAuthenticated ? "Authenticated" : "Not authenticated"
  );

  // For protected routes, check authentication
  if (isProtectedRoute && !isAuthenticated) {
    console.log("Access denied: Redirecting unauthenticated user to login");

    // Create a special page to check localStorage before final redirect
    const localStorageCheckUrl = new URL("/auth-check", request.url);
    localStorageCheckUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(localStorageCheckUrl);
  }

  // For auth routes, redirect authenticated users
  if (isAuthRoute && isAuthenticated && !isOAuthCallback) {
    console.log("Redirecting authenticated user from auth route to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to continue
  console.log("Middleware check complete: Access granted");
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     * - auth-check (our special route)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api|auth-check).*)",
  ],
};
