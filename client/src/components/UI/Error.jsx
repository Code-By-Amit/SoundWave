import React from 'react'

export const Error = ({ errors }) => {
    const filteredErrors = errors?.filter(err => Boolean(err));
    return (
        <div className='text-center m-4'>
            <h1 className='text-md sm:text-xl md:text-3xl text-gray-800 font-extrabold'>Oops
                <span className='text-[var(--primary-color)]'>! </span>
                Error While Loading Content
                <span className='text-[var(--primary-color)]'>.</span>
            </h1>
            {
                filteredErrors && filteredErrors.length > 0 ?
                    (filteredErrors.map((err, index) => {
                        return (
                            <p key={index} className='text-xs sm:text-md md:text-xl font-bold text-gray-700'>Error: {err?.message}<span className='text-[var(--primary-color)]'>.</span></p>
                        )
                    }))
                    :
                    (<p className='text-xs sm:text-md md:text-xl font-bold text-gray-700'>
                        No error details available.
                    </p>)
            }
        </div>
    )
}
