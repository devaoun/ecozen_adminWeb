import { useRef, useState } from "react"
import adminApi from "../apis/admin"



const initialInput = {
    name: '',
    model: '',
    color: '',
    price: ''
}

const errorInitialInput = {
    name: '',
    model: '',
    color: '',
    price: ''
}


export default function ProductManagementPage() {
    const [productImage, setProductImage] = useState()
    const [input, setInput] = useState(initialInput)
    const fileEl = useRef();
    const [loading, setLoading] = useState(false)

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleAddNewProduct = async () => {
        try {
            setLoading(true)
            if (!productImage) {
                alert('Please select product image!!')
            }
            if (productImage) {
                const formData = new FormData();
                formData.append('image', productImage)

                const res = await adminApi.uploadProductImage(formData)
                console.log(res.data.url)

                const adminToken = localStorage.getItem('adminToken')
                const headers = {Authorization : `Bearer ${adminToken}`}
                const resCreate = await adminApi.createProduct({ ...input, image: res.data.url },headers);
                alert(resCreate.data.message)

            }
        } catch (error) {
            alert('Invalid form')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="h-full w-full flex flex-col items-center p-[20px]">
                <div className=" text-[30px] font-bold mb-[15px] w-fit flex flex-col">Product Management</div>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-5 w-fit">
                        <input className="w-[500px] h-[50px] border-2 border-gray-500 bg-gray-100 rounded-xl text-[20px] p-5" placeholder="productName"
                            name="name"
                            value={input.name}
                            onChange={handleInput}
                        />
                        <input className="w-[500px] h-[50px] border-2 border-gray-500 bg-gray-100 rounded-xl text-[20px] p-5" placeholder="model"
                            name="model"
                            value={input.model}
                            onChange={handleInput}
                        />
                        <input className="w-[500px] h-[50px] border-2 border-gray-500 bg-gray-100 rounded-xl text-[20px] p-5" placeholder="color"
                            name="color"
                            value={input.color}
                            onChange={handleInput}
                        />
                        <input className="w-[500px] h-[50px] border-2 border-gray-500 bg-gray-100 rounded-xl text-[20px] p-5" placeholder="price"
                            name="price"
                            value={input.price}
                            onChange={handleInput}
                        />
                    </div>
                    <input hidden type='file' ref={fileEl} onChange={e => {
                        if (e.target.files[0]) {
                            setProductImage(e.target.files[0]);
                        }
                    }} />
                    <button onClick={() => fileEl.current.click()} className="w-[500px] h-[300px] border-2 rounded-3xl flex justify-center items-center gap-[10px] bg-gray-100 hover:bg-gray-300 active:bg-gray-50">
                        {productImage ?
                            <img src={URL.createObjectURL(productImage)} className="w-full h-full object-contain" />
                            :
                            <>
                                <div className=" text-[20px] font-light">Product image</div>
                                <div className="bg-white w-[100px] h-[100px] flex justify-center items-center text-gray-300 text-[60px] font-light rounded-full">+</div>
                            </>
                        }
                    </button>
                    {loading ?
                        <button className="w-[500px] h-[60px] text-white bg-gray-500 rounded-full hover:opacity-80 active:opacity-100" >Loading...</button>
                        :
                        <button className="w-[500px] h-[60px] text-white bg-black rounded-full hover:opacity-80 active:opacity-100" onClick={handleAddNewProduct}>+ New Product</button>
                    }
                </div>
            </div>
        </>
    )
}
