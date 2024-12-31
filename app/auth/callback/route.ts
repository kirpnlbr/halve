import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const requestUrl = new URL(request.url)
        const code = requestUrl.searchParams.get('code')
        console.log("=== Auth Callback Debug ===")
        console.log("1. Incoming URL:", request.url)

        if (code) {
            console.log("2. Creating Supabase client...")
            const supabase = createRouteHandlerClient({ cookies })

            console.log("3. Exchanging code for session...")
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)
            console.log("4. Exchange complete -", error ? "Error occurred" : "Success")

            if (error) {
                console.log("5A. Error case - Redirecting to /")
                return NextResponse.redirect(new URL('/', requestUrl.origin))
            }

            if (!data.session) {
                console.log("5B. No session case - Redirecting to /")
                return NextResponse.redirect(new URL('/', requestUrl.origin))
            }

            const billsUrl = new URL('/bills', requestUrl.origin)
            console.log("5C. Success case - Redirecting to:", billsUrl.toString())
            return NextResponse.redirect(billsUrl)
        }

        console.log("X. No code case - Redirecting to /")
        return NextResponse.redirect(new URL('/', requestUrl.origin))

    } catch (error) {
        console.error("!!! Callback Error !!!")
        console.error(error)
        return NextResponse.redirect(new URL('/', request.url))
    }
}