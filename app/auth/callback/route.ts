import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        try {
            const { error } = await supabase.auth.exchangeCodeForSession(code)
            if (error) {
                return NextResponse.redirect(new URL('/', requestUrl.origin))
            }
            return NextResponse.redirect(new URL('/bills', requestUrl.origin))
        } catch (error) {
            return NextResponse.redirect(new URL('/', requestUrl.origin))
        }
    }

    return NextResponse.redirect(new URL('/', requestUrl.origin))
}