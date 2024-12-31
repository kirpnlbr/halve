import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    console.log('Middleware path:', req.nextUrl.pathname)

    if (req.nextUrl.pathname.startsWith('/auth/callback')) {
        return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session exists:', !!session)

    if (!session && req.nextUrl.pathname.startsWith('/bills')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}