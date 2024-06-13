import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.png'
import Input from "../components/Input";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";

const initialInput = {
    account: '',
    password: ''
}
export default function LoginPage() {
    const [input, setInput] = useState(initialInput)
    const navigate = useNavigate()
    const { login } = useAdmin()

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmitLogin = async (e) => {
        try {
            e.preventDefault()
            await login(input)
            navigate('/userOrder')
            alert('login success')
        } catch (error) {
            alert('login fail')
            console.log(error)
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className=' flex justify-center items-center flex-col'>
                <div className="w-fit h-[200px]">
                    <img src={logo} className=' h-full' />
                </div>
                <div className='font-bold text-[60px] h-fit'>ECOZEN</div>
            </div>
            <div className='font-bold text-[40px] h-fit'>ADMIN</div>
            <form className=' flex flex-col items-center' onSubmit={handleSubmitLogin} >
                <Input
                    name="account"
                    placeholder="Enter your account"
                    onChange={handleChangeInput}
                    value={input.account}
                />
                <Input
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeInput}
                    value={input.password}
                    type="password"
                />
                <button className='mt-[20px] w-full py-[20px] bg-gray-800 text-white text-[25px] font-normal rounded-[100px] hover:bg-gray-900'>LOGIN</button>
            </form>
        </div>
    )
}
