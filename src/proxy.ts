import { auth } from "@/auth" // Import the auth wrapper we made in Phase 2
import { NextResponse } from "next/server"

export default auth((req) => {
  // req.auth contains the user's session data if they are logged in!
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // 1. Define the routes you want to protect
  const protectedRoutes = ["/checkout", "/profile", "/orders", "/addresses"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // 2. Define auth routes (pages logged-in users shouldn't see anymore)
  const isAuthRoute = pathname.startsWith("/login")

  // SCENARIO A: Unauthenticated user tries to access a protected page
  if (isProtectedRoute && !isLoggedIn) {
    // Redirect to login, but remember where they wanted to go so we can send them back later!
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url))
  }

  // SCENARIO B: Logged-in user tries to go to the login page
  if (isAuthRoute && isLoggedIn) {
    // Send them back to the home page (or dashboard)
    return NextResponse.redirect(new URL("/", req.url))
  }

  // SCENARIO C: Let them pass!
  return NextResponse.next()
})

// This config tells Next.js EXACTLY which routes the middleware should run on.
// We exclude API routes, static files, and images to keep your app lightning fast.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}