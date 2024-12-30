'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from "@/utils/supabase/client";
import type { Database } from '@/database.types';

type Bill = Database['public']['Tables']['bills']['Row'];
type BillItem = {
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [bills, setBills] = useState<Bill[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('bills')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;
        setBills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching bills');
        console.error('Error fetching bills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6"> {/* note to self: turn header bar into component */}
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-2xl">Bills</h1>

          <Link href="/bills/new">
            <button className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity">+</button>
          </Link>
        </div>

        <div className="flex items-center justify-center h-64">
          Loading bills...
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6"> {/* note to self: turn header bar into component */}
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-2xl">Bills</h1>

          <Link href="/bills/new">
            <button className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity">+</button>
          </Link>
        </div>

        <div className="flex items-center justify-center h-64">
          Can&apos;t load bills: {error}. Please try again later!
        </div>

      </div>
    );
  }

  return (
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
          <div key={bill.id} className="bg-gray-800 space-y-2 bg-opacity-40 border border-gray-900 rounded-lg p-4 h-52 md:h-72 lg:h-60 backdrop-blur-sm hover:bg-opacity-50 transition-all">

            {/* Upper half - title and date */}
            <p className="text-sm sm:text-md font-semibold">{bill.title}</p>
            <hr className="border-t border-white border-opacity-15" />
            <p className="text-xs">{bill.date}</p>
            <hr className="border-t border-white border-opacity-15" />

            {/* Middle - item details */}
            <div className="grid grid-cols-2 text-xs sm:text-md">
              {(bill.items as BillItem[])?.map((item, id) => (
                <React.Fragment key={id}>
                  <p>{item.name}</p>
                  <p className="text-right">PHP {item.price.toFixed(2)} <span className="text-[10px]">x{item.quantity}</span></p>
                </React.Fragment>
              ))}
            </div>

            {/* Lower half - total amount */}
            <hr className="border-t border-white border-opacity-15" />
            <div className="grid grid-cols-2 text-sm sm:text-md">
              <p>Total</p>
              <p className="text-right">
                ${(bill.items as BillItem[])?.reduce(
                  (sum: number, item: BillItem) =>
                    sum + (item.price * item.quantity), 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
