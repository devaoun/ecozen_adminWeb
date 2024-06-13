import { useEffect } from 'react'
import logo from '../assets/Logo.png'
import useAdmin from '../hooks/useAdmin'
import { IconLogout } from '../assets/icon'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { authAdmin } = useAdmin()
  const navigate = useNavigate()

  const handleClickLogout = () => {
    navigate('/login')
    localStorage.removeItem('accessToken')
  }

  return (
    <>
      <div className=' h-fit shadow flex justify-between items-center px-[30px]'>
        <div className='flex items-center w-fit '>
          <img src={logo} className='h-[100px]' />
          <div className='text-[30px] font-bold'>ECOZEN Management</div>
        </div>
        <div className=' flex justify-center items-center gap-[30px]'>
          <div className=' text-[20px] font-medium'>{authAdmin}</div>
          <button onClick={handleClickLogout}><IconLogout className=" w-[40px]"/></button>
        </div>
      </div>
    </>
  )
}
