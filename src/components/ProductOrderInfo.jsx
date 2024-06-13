


export default function ProductOrderInfo({
    productId,
    name,
    model,
    color,
    size,
    price
}) {
    return (
        <>
            <div className="flex flex-col border-2 bg-white h-fit rounded-lg">
                <div className="flex gap-[60px] w-fit py-[20px] justify-center">
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{productId}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{name}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{model}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{color}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{size}</div>
                    <div className=" text-[20px] font-normal w-[100px] h-[30px] flex justify-center">{price}</div>
                </div>
            </div>
        </>
    )
}
