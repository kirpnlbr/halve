import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    // If user is signed in and trying to access /, redirect to /bills
    if (session && req.nextUrl.pathname === '/') {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/bills'
        return NextResponse.redirect(redirectUrl)
    }

    // If user is not signed in and trying to access protected routes, redirect to /
    if (!session && (req.nextUrl.pathname.startsWith('/bills'))) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/'
        return NextResponse.redirect(redirectUrl)
    }

    return res
}

export const config = {
    matcher: ['/', '/bills/:path*']
}