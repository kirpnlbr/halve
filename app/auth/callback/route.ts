import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// route.ts
export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    console.log('Auth callback received code:', !!code)

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)
            console.log('Session exchange:', { success: !!data, error: !!error })

            const redirectUrl = new URL('/bills', requestUrl.origin)
            const response = NextResponse.redirect(redirectUrl)

            response.headers.set('Cache-Control', 'no-store, max-age=0')
            response.headers.set('Pragma', 'no-cache')

            return response
        } catch (err) {
            console.error('Exchange error:', err)
            return NextResponse.redirect(new URL('/', requestUrl.origin))
        }
    }

    return NextResponse.redirect(new URL('/', requestUrl.origin))
}