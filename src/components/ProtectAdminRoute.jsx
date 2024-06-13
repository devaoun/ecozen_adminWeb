import React from 'react'
import useAdmin from '../hooks/useAdmin'
import { Navigate } from 'react-router-dom'

export default function ProtectAdminRoute({children}) {
    const {authAdmin , isAdminLoading} = useAdmin()
    if(!isAdminLoading && !authAdmin){
        return <Navigate to='/login'/>
    }
  return (
    <>
        {isAdminLoading && <h1>Loading...</h1>}
        {children}
    </>
  )
}
