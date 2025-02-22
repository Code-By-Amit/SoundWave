import React from 'react';
import { Link } from 'react-router-dom';

export const NotLoggedInPage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center dark:bg-gray-900 bg-gray-100 text-gray-800 px-4">
            <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 text-center p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-lg">
                    You need to be logged in to acess this page.  
                </p>
                <Link 
                    to="/login" 
                    className="bg-[var(--primary-color)] hover:opacity-85 text-white font-medium py-1 px-3 md:py-2 md:px-6 rounded-md transition duration-300"
                >
                 Login Now
                </Link>
            </div>
        </div>
    );
};


