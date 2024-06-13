import { useEffect, useState } from "react";
import { IconArrowUp, IconImage } from "../assets/icon";
import ProductOrderInfo from "./ProductOrderInfo";
import adminApi from "../apis/admin";
import { Link } from 'react-router-dom'

export default function OrderCard({
    orderId,
    userId,
    username,
    payment,
    status,
    orderItems,
    fetchUserOrder
}) {

    const [openInfo, setOpenInfo] = useState();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const sumPrice = orderItems.reduce((acc, item) => acc += +item.price, 0)
        setTotal(sumPrice)
    }, [orderItems])

    const handleClickInfo = () => {
        setOpenInfo(!openInfo)
    }

    const handleClickPending = async () => {
        try {
            const res = await adminApi.updateOrderStatus(orderId, 'PENDING')
            alert(res.data.message)
            fetchUserOrder()
            setOpenInfo(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickApprove = async () => {
        try {
            const res = await adminApi.updateOrderStatus(orderId, 'APPROVE')
            alert(res.data.message)
            fetchUserOrder()
            setOpenInfo(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex flex-col bg-gray-100 border-2 rounded-lg h-fit hover:shadow-lg">
                <div className="flex gap-[60px] w-full px-[40px] py-[20px] justify-center bg-white rounded-lg">
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{orderId}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{userId}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{username}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{total} ฿</div>
                    <a href={payment} target="_blank" className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">
                        <IconImage className="h-full" />
                    </a>
                    <div className={` text-[20px] font-normal w-[100px] h-[30px] flex justify-center text-gray-500
                    ${status === 'APPROVE' ? 'text-green-500' : null}`}>{status}</div>
                    <button className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center items-center" onClick={handleClickInfo}><IconArrowUp className={`w-[30px] h-[30px] ${!openInfo ? 'rotate-180' : null}`} /></button>
                </div>
                {openInfo ?
                    <>
                        <hr className="border-[1px] border-gray-300" />
                        <div className="w-full h-fit flex flex-col justify-center items-center gap-[20px] p-[20px]">
                            <div className="w-fit h-[20px] text-[20px] font-bold">Product</div>
                            <div className="flex flex-col gap-[5px]">
                                <div className="flex gap-[60px] w-fit py-[20px] justify-center">
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">id</div>
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">name</div>
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">model</div>
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">color</div>
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">size</div>
                                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">price</div>
                                </div>
                                {orderItems.map(item =>
                                    <ProductOrderInfo
                                        key={item.id}
                                        productId={item.product.id}
                                        name={item.product.name}
                                        model={item.product.model}
                                        color={item.product.color}
                                        size={item.size}
                                        price={item.product.price}
                                    />)}
                            </div>
                            <div className="flex gap-10">
                                <button className=" px-[50px] py-[20px] bg-gray-500  text-white rounded-full hover:shadow-xl active:shadow-inner" onClick={handleClickPending}>PENDING</button>
                                <button className=" px-[50px] py-[20px] bg-green-74ff51 rounded-full hover:shadow-xl active:shadow-inner" onClick={handleClickApprove}>APPROVE</button>
                            </div>
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </>
    )
}
