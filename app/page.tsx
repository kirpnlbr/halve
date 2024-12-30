import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex h-[calc(100vh-10rem)] justify-center items-center">

      {/* Stack form and button vertically */}
      <div className="flex flex-col gap-2 w-[352px] sm:w-80">

        {/* Email input */}
        <form className="flex flex-col">
          <label htmlFor="login" className="block mb-1.5 text-sm font-medium">Email</label>
          <input id="login" name="login" type="email" placeholder="name@domain.com" className="text-sm px-3 py-2 border border-gray-600 bg-gray-700 rounded-md"></input>
        </form>

        {/* Send one-time password button - redirect to /bills for now */}
        <Link href="/bills">
          <button
            type="submit"
            className="w-full rounded-lg text-sm bg-gray-900 border border-gray-800 p-2 hover:bg-opacity-90 transition-opacity"
          >
            Send me a one-time password
          </button>
        </Link>

      </div>

    </section >
  )
}