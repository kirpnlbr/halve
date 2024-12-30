export default function CreateBill() {

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
                                Add people
                            </label>
                            <input
                                id="people"
                                name="people"
                                type="text"
                                placeholder="John Doe"
                                className="w-full text-sm px-2 py-1.5 border border-gray-600 bg-gray-700 rounded-md"
                            />
                        </div>
                        <button
                            type="button"
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity"
                        >
                            +
                        </button>
                    </div>

                    {/* People list */}
                    <div className="space-y-1.5">
                        <div className="px-3 py-2 text-sm rounded-lg bg-gray-600 bg-opacity-50">
                            Me
                        </div>
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
                            placeholder="McDonalds Run"
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
                <section className="space-y-6">
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
                        <div className="flex-1">
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

                        {/* Add item button */}
                        <button
                            type="button"
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity"
                        >
                            +
                        </button>

                        {/* Delete item button */}
                        <button
                            type="button"
                            className="self-end rounded-lg bg-gray-800 border border-gray-700 px-3 py-1 hover:bg-opacity-90 transition-opacity"
                        >
                            Trash
                        </button>

                    </div>
                </section>

                <hr className="border-t border-white border-opacity-15" />

                {/* Create bill button */}
                <section>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 border border-gray-800 py-2 hover:bg-opacity-90 transition-opacity"
                    >
                        Submit
                    </button>
                </section>
            </form>
        </div>
    )
}