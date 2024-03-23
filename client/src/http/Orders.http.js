import {$authHost, $host} from "./index.http";

export const getAllOrders = async () => {
    try {
        console.log('TRY GET ALL ORDERS');
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

export const createOrder = async (address,products,price) => {
    try {
        const formdata = new FormData()
        
        formdata.append('address', address)
        formdata.append('products', JSON.stringify(products))
        formdata.append('price', price)

        const {data} = await $authHost.post('api/order/user', formdata, {timeout: 6000})
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
