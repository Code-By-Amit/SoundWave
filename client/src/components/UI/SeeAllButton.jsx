import React from 'react'
import { NavLink } from 'react-router-dom'

export const SeeAllButton = ({ to }) => {
    return (
        <NavLink to={to}>
            <button className="text-gray-600 dark:text-gray-400 md:mx-4 hover:text-[var(--primary-color)] cursor-pointer">
                See All
            </button>
        </NavLink>
    )
}
