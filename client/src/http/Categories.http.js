import {$authHost, $host} from "./index.http";

export const getAllCategories = async () => {
    try {
        const {data} = await $host.get('api/category')
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const getOneCategory = async (id) => {
    try {
        const {data} = await $host.get(`api/category/${id}`)
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}