import axios from "../config/axios";

const adminApi = {}

adminApi.login = (data) => axios.post('/admin/login/',data)
adminApi.getAccount = (headers) => axios.get('/admin/account',{headers})
adminApi.getUserOrder = () => axios.get('/admin/allUserOrder')
adminApi.updateOrderStatus = (orderId,status,headers) => axios.patch(`/admin/orderStatus/${orderId}`,{status},{headers})
adminApi.uploadProductImage = (image) => axios.patch('/product/upload',image,{
    headers:{'Content-Type' : 'multipart/form-data'}
})
adminApi.createProduct = (data,headers) => axios.post('/product/create',data,{headers})

export default adminApi