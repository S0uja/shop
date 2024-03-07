import {$authHost, $host} from "./index.http";

export const getAllOrders = async () => {
    try {
        const {data} = await $authHost.get('api/order/user',{timeout: 6000})
        if(data.status==='error'){
            return {status:'error', data:data.body}
        }
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}
