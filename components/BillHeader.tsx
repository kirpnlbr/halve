import Link from 'next/link';

export default function BillHeader() {
    return (
        <div className="flex items-center justify-between">
            <header>
                <h1 className="font-medium text-2xl">Bills</h1>
            </header>
            <Link href="/bills/new">
                <button className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 active:scale-95 transition">+</button>
            </Link>
        </div>
    )
}