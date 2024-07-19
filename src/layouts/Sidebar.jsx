import React from 'react'

export default function Sidebar() {
  return (
    <div className='w-[300px] min-h-[100vh] bg-gray-400 p-[10px] flex flex-col'>
      <a href='/userOrder' className=' hover:underline text-[20px] font-bold'>ข้อมูลคำสั่งซื้อ</a>
      <a href='/productManagement' className=' hover:underline text-[20px] font-bold'>Product management</a>
    </div>
  )
}
