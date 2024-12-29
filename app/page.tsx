export default function Home() {
  return (
    <div className="max-w-5xl mx-auto pt-20 pb-20 px-8">
      <div className="space-y-6">

        {/* Bills - header bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-medium text-2xl">Bills</h1>
          <button className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity">+</button>
        </div>

        {/* Grid for receipts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Receipts */}
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all">

            {/* Upper half containing title and date */}
            <h2 className="text-md sm:text-lg">Title</h2>
            <hr className="border-t border-white border-opacity-20" />
            <p className="text-xs">Aug 24, 2024</p>
            <hr className="border-t border-white border-opacity-20" />

            {/* Middle containing item details */}
            <div className="grid grid-cols-2 text-sm sm:text-md">
              <p>Item #1</p>
              <p className="text-right">Price</p>
              <p>Item #2</p>
              <p className="text-right">Price</p>
              <p>Item #3</p>
              <p className="text-right">Price</p>
            </div>

            {/* Lower half containing total amount */}
            <hr className="border-t border-white border-opacity-20" />
            <div className="grid grid-cols-2 text-sm sm:text-md">
              <p>Total</p>
              <p className="text-right">###</p>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
          <div className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all"></div>
        </div>
      </div>
    </div>
  );
}
