'use client'

import React, { useState } from 'react'
import { Trash2, Plus } from 'lucide-react';
import Link from 'next/link'

/* 'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import type { Database } from '@/database.types';

type Bill = Database['public']['Tables']['bills']['Row'];
type BillItem = {
    name: string;
    price: number;
    quantity: number;
}

export default function CreateBill() {
    const [newPerson, setNewPerson] = useState<string>('');
    const [people, setPeople] = useState<Bill[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const { data, error: supabaseError } = await supabase
                    .from('bills')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (supabaseError) throw supabaseError;
                setPeople(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching people');
                console.error('Error fetching people:', err);
            }
        };
        fetchPeople();
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                Can&apos;t load people: {error}. Please try again later!
            </div>
        )
    }

    const addPerson = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPerson.trim()) {
            try {
                const { data, error: supabaseError } = await supabase
                    .from('bills')
                    .insert([{
                        split_by: [newPerson.trim()],
                        created_at: new Date().toISOString()
                    }])
                    .select();

                if (supabaseError) throw supabaseError;

                if (data) {
                    setPeople(prevPeople => [...(data as Bill[]), ...prevPeople]);
                }

                setNewPerson('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error adding person');
                console.error('Error adding person:', err);
            }
        }
    } */

export default function CreateBill() {
    const [newPerson, setNewPerson] = useState<string>(''); // input field
    const [people, setPeople] = useState<string[]>([]); // list of added people

    const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPerson(e.target.value);
    }

    const handleSubmitPerson = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        if (newPerson.trim()) {
            setPeople([...people, newPerson.trim()]);
            setNewPerson('');
        }
    }

    const handleRemovePerson = (index: number): void => {
        setPeople(people.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            <header>
                <h1 className="font-medium text-xl">Create bill</h1>
            </header>

            {/* Create bill */}
            <form className="space-y-6">

                {/* Section: People */}
                <section className="space-y-3">
                    {/* People input */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label
                                htmlFor="people"
                                className="block mb-2 text-sm font-medium"
                            >
                                Add person
                            </label>
                            <input
                                id="people"
                                name="people"
                                type="text"
                                value={newPerson}
                                onChange={handlePersonChange}
                                placeholder="John Doe"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                            />
                        </div>
                        <button // on click
                            type="button"
                            onClick={handleSubmitPerson}
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 active:scale-95 transition"
                        >
                            <Plus className="h-6 w-3.5" />
                        </button>
                    </div>
                    {/* People list */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-3 py-2 text-sm rounded-lg bg-gray-600 bg-opacity-50">
                            Me
                        </div>
                        {people.map((person, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 text-sm rounded-lg bg-gray-600 bg-opacity-50">
                                {person}
                                <button type="button" onClick={() => handleRemovePerson(index)} className="active:scale-90 transition">
                                    <Trash2 className="h-6 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-t border-white border-opacity-15" />

                {/* Section: Title & Date */}
                <section className="space-y-6">
                    {/* Title input */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g., Dinner at Camino"
                            className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                        />
                    </div>
                    {/* Date input */}
                    <div>
                        <label
                            htmlFor="date"
                            className="block mb-2 text-sm font-medium"
                        >
                            Date
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            placeholder="MM/DD/YY"
                            className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                        />
                    </div>
                </section>

                <hr className="border-t border-white border-opacity-15" />

                {/* Section: Items */}
                <section className="space-y-3">
                    <div className="flex gap-2.5">
                        {/* Item description input */}
                        <div className="flex-1">
                            <label
                                htmlFor="item"
                                className="block mb-2 text-sm font-medium"
                            >
                                Item description
                            </label>
                            <input
                                id="item"
                                name="item"
                                type="text"
                                placeholder="McNuggets"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                            />
                        </div>
                        {/* Amount input */}
                        <div className="w-28">
                            <label
                                htmlFor="amount"
                                className="block mb-2 text-sm font-medium"
                            >
                                Amount
                            </label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="0"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                            />
                        </div>
                        {/* Quantity input */}
                        <div className="w-16">
                            <label
                                htmlFor="quantity"
                                className="block mb-2 text-sm font-medium"
                            >
                                Quantity
                            </label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="0"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                            />
                        </div>
                        {/* Add item button */}
                        <button
                            type="button"
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 active:scale-95 transition"
                        >
                            <Plus className="h-6 w-3.5" />
                        </button>
                        {/* Delete item button */}
                        <button
                            type="button"
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 active:scale-95 transition"
                        >
                            <Trash2 className="h-6 w-4" />
                        </button>
                    </div>
                    {/* People tags */}
                    <div className="flex gap-1.5">
                        <button className="rounded-full bg-gray-800 border border-gray-700 text-sm px-4 py-1 hover:bg-opacity-90 active:scale-95 transition">Kir</button>
                        <button className="rounded-full bg-gray-800 border border-gray-700 text-sm px-4 py-1 hover:bg-opacity-90 active:scale-95 transition">Butler</button>
                    </div>
                </section>

                <hr className="border-t border-white border-opacity-15" />

                {/* Create bill button */}
                <section className="flex flex-col gap-2">
                    <button
                        type="submit"
                        className="text-sm w-full rounded-lg bg-gray-900 border border-gray-800 py-2.5 hover:bg-opacity-90 active:scale-95 transition"
                    >
                        Submit bill
                    </button>
                    <Link className="w-full" href="/bills">
                        <button
                            type="submit"
                            className="text-sm w-full rounded-lg border border-gray-800 py-2.5 active:scale-95 transition"
                        >
                            Go back
                        </button>
                    </Link>
                </section>
            </form>
        </div>
    )
}