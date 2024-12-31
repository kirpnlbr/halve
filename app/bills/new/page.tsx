'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Calendar } from 'lucide-react';
import { supabase } from "@/utils/supabase/client";
import type { Database, Json } from '@/database.types';
import { useRouter } from 'next/navigation';

type BillItem = {
    name: string;
    price: number;
    quantity: number;
}

export default function CreateBill() {
    const router = useRouter();

    // States
    const [error, setError] = useState<string | null>(null);
    const [newPerson, setNewPerson] = useState<string>(''); // person input field
    const [people, setPeople] = useState<string[]>([]); // list of added people
    const [newItem, setNewItem] = useState<{
        name: string;
        price: number;
        quantity: number;
    }>({
        name: '',
        price: 0,
        quantity: 0,
    }); // item input field
    const [items, setItems] = useState<BillItem[]>([]); // list of added items
    const [billDetails, setBillDetails] = useState({ // title & date input field
        title: '',
        date: '',
    })

    // Add bill details event handler
    const handleBillDetailsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setBillDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Add person event handlers
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

    // Add item event handlers
    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: name === "name" ? value : value === "" ? 0 : Number(value)
        }));
    };

    const handleSubmitItem = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (newItem.name.trim()) {
            setItems(prev => [...prev, newItem]);
            setNewItem({ name: '', price: 0, quantity: 0 });
        }
    };

    const handleRemoveItem = (index: number): void => {
        setItems(items.filter((_, i) => i !== index));
    };

    // Submit form event handler and update database
    const handleSubmitBill = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!billDetails.title || !billDetails.date || items.length === 0 || people.length === 0) {
                throw new Error('Please fill in all required fields.');
            }

            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                throw new Error('Not authenticated')
            }

            const newBill: Omit<Database['public']['Tables']['bills']['Insert'], 'id'> = {
                title: billDetails.title,
                date: billDetails.date,
                items: items as Json,
                created_at: new Date().toISOString()
                user_id: session.user.id
            };

            console.log('Attempting to insert bill:', JSON.stringify(newBill, null, 2));

            const { data, error } = await supabase
                .from('bills')
                .insert([newBill])
                .select();

            if (error) throw error;

            if (data) {
                router.push('/bills');
            }
        } catch (err) {
            console.error('Error object:', err);
            console.error('Error stringified:', JSON.stringify(err, null, 2));
            setError(err instanceof Error ? err.message : 'Error submitting bill');
        }
    };

    return (
        <div className="space-y-4">
            <header>
                <h1 className="font-medium text-xl">Create bill</h1>
            </header>

            {/* Create bill */}
            <form onSubmit={handleSubmitBill} className="space-y-6">

                {/* Show error message */}
                {error && (
                    <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-600 bg-opacity-50 text-gray-200">
                        <div className="flex-1">{error}</div>
                        <button
                            onClick={() => setError(null)}
                            className="text-gray-400 hover:text-gray-200 active:scale-95 transition"
                        >
                            ×
                        </button>
                    </div>
                )}

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
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                            />
                        </div>
                        <button
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
                            value={billDetails.title}
                            onChange={handleBillDetailsChange}
                            placeholder="e.g., Dinner at Camino"
                            className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                        />
                    </div>
                    {/* Date input */}
                    <div className="relative w-full">
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
                            value={billDetails.date}
                            onChange={handleBillDetailsChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full min-w-0 text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => (document.getElementById('date') as HTMLInputElement)?.showPicker?.()}
                            className="absolute right-2 top-[38px] active:scale-95 transition"
                        >
                            <Calendar className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </section>

                <hr className="border-t border-white border-opacity-15" />

                {/* Section: Items */}
                <section className="space-y-3">
                    <div className="flex gap-2.5">
                        {/* Item description input */}
                        <div className="flex-[3] min-w-0">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium"
                            >
                                Item name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={newItem.name}
                                onChange={handleItemChange}
                                placeholder="McNuggets"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                            />
                        </div>
                        {/* Price input */}
                        <div className="flex-1 min-w-[5rem] max-w-[8rem]">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium"
                            >
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={newItem.price || ''}
                                onChange={handleItemChange}
                                placeholder="0.00"
                                min="0"
                                step="1"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                            />
                        </div>
                        {/* Quantity input */}
                        <div className="flex-[0.6] min-w-[4rem] max-w-[5rem]">
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
                                value={newItem.quantity || ''}
                                onChange={handleItemChange}
                                placeholder="0"
                                min="0"
                                step="1"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md focus:outline-none"
                            />
                        </div>
                        {/* Add item button */}
                        <button
                            type="button"
                            onClick={handleSubmitItem}
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 active:scale-95 transition"
                        >
                            <Plus className="h-6 w-3.5" />
                        </button>
                    </div>

                    {/* Items list */}
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 text-sm rounded-lg bg-gray-600 bg-opacity-50">
                                <div className="flex-1">{item.name}</div>
                                <div className="w-28 text-right">PHP {item.price.toFixed(2)}</div>
                                <div className="w-16 mr-2 text-right text-xs">×{item.quantity}</div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    className="ml-2 active:scale-90 transition"
                                >
                                    <Trash2 className="h-6 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* People tags */}
                    {/* <div className="flex gap-1.5">
                        {people.map((person, index) => (
                            <button key={index} className="rounded-full bg-gray-800 border border-gray-700 text-sm px-4 py-1 hover:bg-opacity-90 active:scale-95 transition">
                                {person}
                            </button>
                        ))}
                    </div> */}
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
        </div >
    )
}