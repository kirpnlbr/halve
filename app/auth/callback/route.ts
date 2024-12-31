import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    console.log("Auth Callback Route - Start", requestUrl.href)

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        console.log("Session data:", !!data?.session, "Error:", !!error)

        if (error || !data.session) {
            console.error('Auth error:', error)
            return NextResponse.redirect(new URL('/', requestUrl.origin))
        }

        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.redirect(new URL('/bills', requestUrl.origin))
    }

    return NextResponse.redirect(new URL('/', requestUrl.origin))
}