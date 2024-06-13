import { createContext, useEffect, useState } from "react"
import adminApi from "../apis/admin";

export const AuthAdminContext = createContext()

export default function AuthAdminProvider({ children }) {
    const [authAdmin, setAuthAdmin] = useState();
    const [isAdminLoading,setIsAdminLoading] = useState(true)

    const fetchAdmin = async () => {
        try {
            if(localStorage.getItem('accessToken')){
                const accessToken = localStorage.getItem('accessToken');
                const headers = {Authorization: `Bearer ${accessToken}`};
                const res = await adminApi.getAccount(headers);
                setAuthAdmin(res.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsAdminLoading(false)
        }
    }
    useEffect(() => {
        fetchAdmin();
    }, [])

    const login = async(credential) => {
        const res = await adminApi.login(credential)
        localStorage.setItem('accessToken',res.data.accessToken)
        const headers = {Authorization : `Bearer ${res.data.accessToken}`}
        const resAuthAdmin = await adminApi.getAccount(headers)
        setAuthAdmin(resAuthAdmin.data.message)
    }

    return (
        <AuthAdminContext.Provider value={{login , authAdmin, isAdminLoading}}>{children}</AuthAdminContext.Provider>
    )
}
