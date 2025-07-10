import React from 'react'

const NewLetter = () => {
return (
    <div className=" w-full md:w-300  mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center mb-15">
        <h1 className="text-2xl font-bold mb-2 text-black">Never Miss a Blog!</h1>
        <p className="text-gray-600 mb-6 text-center">
            Subscribe to get the latest blogs, new tech, and exclusive news.
        </p>
        <form className="w-full flex flex-col sm:flex-row gap-3">
            <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
                Subscribe
            </button>
        </form>
    </div>
)
}

export default NewLetter