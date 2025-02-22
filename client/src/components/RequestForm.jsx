import React from 'react'
import toast from 'react-hot-toast';
import { LoadingDots } from './LoadingDots';
import { useNavigate } from 'react-router-dom';

export const RequestForm = () => {
    const [isPending, setIsPending] = React.useState(false);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_Web3Form_ACCESS_KEY);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Request Sent Successfully!");
            setIsPending(false)
            event.target.reset();
        } else {
            console.log("Error", data);
            toast.error(data.message);
        }
    };

    return (
        <>
         <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>
            <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-20">
                <h1 className="text-center m-4 text-md md:text-xl font-bold text-gray-800 dark:text-gray-200">
                    Reach Out to the Admin for Artist Requests or Messages
                </h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
                        <input
                            className="w-full px-4 py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
                        <input
                            className="w-full px-4 py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Message</label>
                        <textarea
                            className="w-full px-4  py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-28"
                            name="message"
                            placeholder="Type your message..."
                            required>
                        </textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary-color)] hover:opacity-90 text-white font-semibold  py-1 md:py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        {isPending ? (<>Sending<LoadingDots /></>) : 'Submit'}
                    </button>
                </form>
            </div>
        </>

    )
}
