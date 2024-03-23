import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPersonal } from '../http/Admin.http';
import font from '../themes/font.theme'
import PersonalModal from '../modals/Personal.modal';
import { setPersonalModal, setSnackbarModal } from '../store/modals.store'
import {deleteUser} from '../http/Admin.http'
import ConfirmModal from '../modals/Confirm.modal'
import { setConfirmModal } from '../store/modals.store'
const columns = [
    {
        id: 'id',
        label: '#',
        minWidth: 15,
        align: 'center',
    },
    {
        id: 'number',
        label: 'Номер телефона',
        minWidth: 120
    },
    { 
        id: 'fio',
        label: 'ФИО',
        minWidth: 140
    },
    { 
        id: 'role',
        label: 'Должность',
        minWidth: 50
    },
    {
        id: 'birthdate',
        label: 'Дата рождения',
        minWidth: 110,
        align: 'right',
    },
];

const PersonalComponent = () => {
    const [data,setData] = useState([])
    const dispatch = useDispatch()

    const openPersonalModal = () => {
        dispatch(setPersonalModal(true))
    }

    const updateData = () => {
        getAllPersonal().then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                setData(res.data.data)
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
        })
    }

    const handleDelete = (id) => {
        deleteUser(id).then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'success',
                    message:"Успешно"
                }))
                updateData()
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
        })
    }

    const handleEdit = (id) => {
        dispatch(setPersonalModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <PersonalModal onCreate={updateData} />
            <ConfirmModal title={'Подтвердите удаление'} text={'Вы уверены что хотите удалить сотрудника?'}/>
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Персонал</Typography>
                <Table onCreate={openPersonalModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default PersonalComponent