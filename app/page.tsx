import React from 'react';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";

interface BillItem {
  name: string;
  price: number;
  quantity: number;
}

export default async function Home() {
  const supabase = await createClient();

  const { data: bills, error } = await supabase
    .from('bills')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching items:', error)
    return <div>Error loading bills. Try again!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pt-20 pb-20 px-8">
      <div className="space-y-6">

        {/* Bills - header bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-medium text-2xl">Bills</h1>

          {/* Add bill */}
          <Link href="/bills/new">
            <button className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity">+</button>
          </Link>
        </div>

        {/* Grid for receipts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bills?.map((bill) => (
            <div key={bill.id} className="bg-gray-800 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all">
              {/* Upper half containing title and date */}
              <p className="text-md sm:text-lg">{bill.title}</p>
              <hr className="border-t border-white border-opacity-20" />
              <p className="text-xs">{bill.date}</p>
              <hr className="border-t border-white border-opacity-20" />

              {/* Middle containing item details */}
              <div className="grid grid-cols-2 text-sm sm:text-md">
                {bill.items?.map((item: BillItem, index: number) => (
                  <React.Fragment key={index}>
                    <p>{item.name}</p>
                    <p className="text-right">PHP {item.price.toFixed(2)} <span className="text-xs">x{item.quantity}</span></p>
                  </React.Fragment>
                ))}
              </div>

              {/* Lower half containing total amount */}
              <hr className="border-t border-white border-opacity-20" />
              <div className="grid grid-cols-2 text-sm sm:text-md">
                <p>Total</p>
                <p className="text-right">${bill.items?.reduce((sum: number, item: BillItem) => sum + item.price, 0).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
