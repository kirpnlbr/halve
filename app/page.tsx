import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function Home() {
  // const router = useRouter();

  return (
    <section className="flex h-[calc(100vh-10rem)] justify-center items-center">

      {/* Stack form and button vertically */}
      <div className="flex flex-col gap-2 w-[352px] sm:w-80">

        {/* Email input */}
        <form className="flex flex-col gap-1.5">
          <label
            htmlFor="login"
            className="text-sm font-medium"
          >
            Email
          </label>
          <input
            id="login"
            name="login"
            type="email"
            placeholder="name@domain.com"
            className="text-sm px-3 py-2 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
            required
          />
        </form>

        {/* Send one-time password button - redirect to /bills for now */}
        <Link href="/bills">
          <button
            type="submit"
            className="w-full rounded-lg text-sm bg-gray-900 border border-gray-800 p-2 hover:bg-opacity-90 transition-[opacity, transform] focus:scale-95"
          >
            Send me a one-time password
          </button>
        </Link>

      </div>

    </section >
  )
}