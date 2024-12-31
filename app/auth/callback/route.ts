import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    console.log('Auth callback received code:', !!code)

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)
            console.log('Exchange result:', { success: !!data, hasError: !!error })

            if (error) {
                console.error('Exchange error:', error)
                return NextResponse.redirect(new URL('/', requestUrl.origin))
            }

            const { data: { session } } = await supabase.auth.getSession()
            console.log('Session after exchange:', !!session)

            const response = NextResponse.redirect(new URL('/bills', requestUrl.origin), {
                status: 302
            })
            response.headers.set('Cache-Control', 'no-store, max-age=0')
            return response
        } catch (err) {
            console.error('Unexpected error:', err)
            return NextResponse.redirect(new URL('/', requestUrl.origin))
        }
    }

    console.log('No code in callback')
    return NextResponse.redirect(new URL('/', requestUrl.origin))
}