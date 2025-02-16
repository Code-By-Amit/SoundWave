import React from 'react'
import { SongTable } from '../components/UI/SongTable/SongTable'
import { MdFileUpload } from 'react-icons/md';
import { Link } from 'react-router-dom';
export const UploadSongPage = () => {
    return (
        <>
            <div className='p-5 md:mx-4'>
                <h1 className='dark:text-white text-2xl font-bold my-5'>Your Uploads</h1>
                <SongTable />
                <div className='my-9'>
                    <Link to="/upload-song">
                    <button className='text-white rounded shadow-md py-2.5 px-3 text-base md:text-md font-semibold bg-[var(--primary-color)] flex items-center gap-3 hover:opacity-75 active:opacity-75'><MdFileUpload className='text-2xl md:text-3xl' /> Upload More</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
