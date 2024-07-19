import { createContext, useEffect, useState } from "react"
import adminApi from "../apis/admin";

export const AuthAdminContext = createContext()

export default function AuthAdminProvider({ children }) {
    const [authAdmin, setAuthAdmin] = useState();
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    const [role , setRole] = useState('')

    const fetchAdmin = async () => {
        try {
            if (localStorage.getItem('adminToken')) {
                const adminToken = localStorage.getItem('adminToken');
                const headers = { Authorization: `Bearer ${adminToken}` };
                const res = await adminApi.getAccount(headers);
                setAuthAdmin(res.data.message)
                setRole(res.data.role)
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

    const login = async (credential) => {
        const res = await adminApi.login(credential)
        localStorage.setItem('adminToken', res.data.adminToken)
        const headers = { Authorization: `Bearer ${res.data.adminToken}` }
        const resAuthAdmin = await adminApi.getAccount(headers)
        setAuthAdmin(resAuthAdmin.data.message)
    }

    return (
        <AuthAdminContext.Provider value={{ login, authAdmin, isAdminLoading, role }}>{children}</AuthAdminContext.Provider>
    )
}
