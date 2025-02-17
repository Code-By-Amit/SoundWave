import React, { useEffect, useState } from 'react'

export const ColorPiker = () => {
  const [color,setColor] = useState(null)

  useEffect(()=>{
    const root = getComputedStyle(document.documentElement);
    const primaryColor = root.getPropertyValue('--primary-color') || "#000000";
    setColor(primaryColor.trim())
  },[])

  useEffect(()=>{
    document.documentElement.style.setProperty('--primary-color',color)
  },[color])
  return (
    <>
    <div className='flex'>
    {/* <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2 dark:text-white">Color picker</label> */}
    <input type="color" className="md:p-1 p-0.5 h-6 w-8 md:h-8 md:w-11 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="hs-color-input" value={color} onChange={(e)=>setColor(e.target.value)} title="Choose your color" />
    </div>
    </>
  )
}
