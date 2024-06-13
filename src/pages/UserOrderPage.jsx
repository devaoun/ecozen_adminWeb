import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import adminApi from "../apis/admin";

export default function UserOrder() {
  const [userOrder , setUserOrder] = useState([])

  const fetchUserOrder = async() => {
    try {
      const res = await adminApi.getUserOrder();
      setUserOrder(res.data.order)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserOrder()
  },[])

  return (
    <div className='h-full w-full'>
      <div className="min-h-[70vh] mb-[40px]">
        <div className=" text-[30px] font-bold mx-auto w-fit my-[30px]">ข้อมูลคำสั่งซื้อ</div>
        <div className="flex flex-col w-fit mx-auto gap-[20px] items-center">
          <div className="flex gap-[60px] w-fit">
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Order Id</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">User Id</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Username</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Total</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Payment</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Status</div>
            <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">Info</div>
          </div>
          {userOrder?.map(item =>
          <OrderCard
          key={item.id}
          orderId={item.id}
          userId={item.userId}
          username={item.user.username}
          payment={item.slip}
          status={item.status}
          orderItems={item.orderItems}
          fetchUserOrder={fetchUserOrder}
          />)}
        </div>
      </div>
    </div>
  )
}
