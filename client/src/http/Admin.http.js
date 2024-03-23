import {$authHost, $host} from "./index.http";

export const getAllPersonal = async () => {
    try {
        console.log('TRY GET PERSONAL');

        const {data} = await $authHost.get('api/user/admin/personal', {timeout: 6000})
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const createUser = async (number,password,fio,role,birthdate) => {
    try {
        console.log('TRY CREATE USER');

        const formdata = new FormData()
        formdata.append('number', number)
        formdata.append('password', password)
        formdata.append('fio', fio)
        formdata.append('role', role)
        formdata.append('birthdate', birthdate)

        const {data} = await $authHost.post(`api/user/admin`,formdata, {timeout: 6000})
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const deleteUser = async (id) => {
    try {
        console.log('TRY DELETE USER')

        const {data} = await $authHost.delete(`api/user/admin/${id}`, {timeout: 6000})
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}