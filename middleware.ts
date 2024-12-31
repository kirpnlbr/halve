import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    console.log('Middleware handling path:', req.nextUrl.pathname)

    if (req.nextUrl.pathname.startsWith('/auth/callback')) {
        console.log('Allowing callback through middleware')
        return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session }, error } = await supabase.auth.getSession()

    console.log('Middleware session check:', {
        path: req.nextUrl.pathname,
        hasSession: !!session,
        hasError: !!error
    })

    if (!session && req.nextUrl.pathname.startsWith('/bills')) {
        console.log('Redirecting unauthenticated user from /bills to /')
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (session && req.nextUrl.pathname === '/') {
        console.log('Redirecting authenticated user from / to /bills')
        return NextResponse.redirect(new URL('/bills', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/bills/:path*', '/auth/callback']
}