import axios from "../config/axios";

const adminApi = {}

adminApi.login = (data) => axios.post('/admin/login/',data)
adminApi.getAccount = (headers) => axios.get('/admin/account',{headers})
adminApi.getUserOrder = () => axios.get('/admin/allUserOrder')
adminApi.updateOrderStatus = (orderId,status) => axios.patch(`/admin/orderStatus/${orderId}`,{status})

export default adminApi