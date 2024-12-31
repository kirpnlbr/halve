import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        try {
            const { error } = await supabase.auth.exchangeCodeForSession(code)

            if (error) {
                console.error('Auth error:', error)
                return NextResponse.redirect(new URL('/', requestUrl.origin))
            }

            return NextResponse.redirect(new URL('/bills', requestUrl.origin), {
                status: 303,
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                }
            })
        } catch (err) {
            console.error('Unexpected error:', err)
            return NextResponse.redirect(new URL('/', requestUrl.origin))
        }
    }

    return NextResponse.redirect(new URL('/', requestUrl.origin))
}