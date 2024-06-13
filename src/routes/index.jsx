import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import MainContainer from '../layouts/MainContainer'
import ProtectAdminRoute from '../components/ProtectAdminRoute'
import UserOrderPage from '../pages/UserOrderPage'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: (
            <ProtectAdminRoute>
                <MainContainer />
            </ProtectAdminRoute>
        ),
        children: [
            { path: 'userOrder', element: <UserOrderPage/> }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}