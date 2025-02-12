import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'


export default function MainContainer() {
  return (
    <>
      <Header />
      <div className='flex'>
      <Sidebar/>
      <Outlet />
      </div>
    </>
  )
}
