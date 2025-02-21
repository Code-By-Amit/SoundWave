import React from 'react'
import toast from 'react-hot-toast';
import { LoadingDots } from './LoadingDots';

export const RequestForm = () => {
    const [isPending, setIsPending] = React.useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.target);

        formData.append("access_key", "af82e44c-c591-4852-bd4a-b5f56ca02ae1");

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
            <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-20">
                <h1 className="text-center m-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                    Reach Out to the Admin for Artist Requests or Messages
                </h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
                        <input
                            className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-28"
                            name="message"
                            placeholder="Type your message..."
                            required>
                        </textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary-color)] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        {isPending ? (<>Sending<LoadingDots /></>) : 'Submit'}
                    </button>
                </form>
            </div>
        </>

    )
}
