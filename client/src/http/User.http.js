import {$authHost, $host} from "./index.http";
import {jwtDecode} from "jwt-decode";

export const userRegistration = async (number, password, fio, birthdate) => {
    try {
        const formdata = new FormData()
        formdata.append('number', number)
        formdata.append('password', password)
        formdata.append('fio', fio)
        formdata.append('birthdate', birthdate)

        const {data} = await $host.post('api/user/register', formdata, {timeout: 6000})

        if(data.status==='error'){
            return {status:'error', data:data.body}
        }
        
        const jwt = jwtDecode(data.body.data[0])

        localStorage.setItem('token', data.body.data[0])
        return {status:'success', data:{data:[jwt],message:[]}}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const userLogin = async (number, password) => {
    try {
        const formdata = new FormData()
        formdata.append('number', number)
        formdata.append('password', password)

        const {data} = await $host.post('api/user/login', formdata, {timeout: 6000})

        if(data.status==='error'){
            return {status:'error', data:data.body}
        }
        
        const jwt = jwtDecode(data.body.data[0])

        localStorage.setItem('token', data.body.data[0])
        return {status:'success', data:{data:[jwt],message:[]}}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }

}

export const userCheck = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth',{timeout: 6000})
        if(data.status==='error'){
            return {status:'error', data:data.body}
        }
        
        const jwt = jwtDecode(data.body.data[0])

        localStorage.setItem('token', data.body.data[0])
        return {status:'success', data:{data:[jwt],message:[]}}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
    
}