'use client'

import { useState } from 'react'
import { supabase } from "@/utils/supabase/client";

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true
        },
      })

      if (error) throw error

      setMessage('Check your email for the login link!')

    } catch (error) {
      setMessage('Error sending magic link')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex h-[calc(100vh-10rem)] justify-center items-center">

      {/* Stack form and button vertically */}
      <div className="flex flex-col gap-2 w-[352px] sm:w-80">
        {/* Email input */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            className="text-sm px-3 py-2 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
            required
          />
          {/* Send one-time password button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg mt-2 text-sm bg-gray-900 border border-gray-800 p-2 hover:bg-opacity-90 active:scale-95 transition"
          >
            {loading ? 'Loading...' : 'Send me a one-time password'}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}