import {$authHost, $host} from "./index.http";

export const getAllProducts = async (page,category,search,sort) => {
    try {
        const { data } = await $host.get('api/product', {
            params: {
                page: page,
                category: category,
                sort: sort,
                search: search,
            }
        })

        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const getOneProduct = async (id) => {
    try {
        const {data} = await $host.get(`api/product/${id}`)
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const getMainPage = async () => {
    try {
        const {data} = await $host.get(`api/product/mp`)
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}