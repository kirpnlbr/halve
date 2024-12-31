import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const requestUrl = new URL(request.url)
        const code = requestUrl.searchParams.get('code')
        console.log("Auth Callback Route - Start", requestUrl.href)

        if (code) {
            const supabase = createRouteHandlerClient({ cookies })

            await supabase.auth.exchangeCodeForSession(code)
            console.log("Session exchange completed")

            return NextResponse.redirect(new URL('/bills', requestUrl.origin))
        }

        console.log("No code provided")
        return NextResponse.redirect(new URL('/', requestUrl.origin))

    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.redirect(new URL('/', request.url))
    }
}