import {Modal,Box,Backdrop,IconButton,Button,CircularProgress} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalModal, setSnackbarModal } from '../store/modals.store'
import font from "../themes/font.theme"
import modal from '../themes/modal.theme'
import CloseIcon from '@mui/icons-material/Close'
import {useState} from 'react'
import FormTextFieldComponent from '../components/FormTextField.component'
import {createUser} from '../http/Admin.http'

const PersonalModal = (props) => {
    const PersonalModalStatus=useSelector(state => state.modals.personalModal)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [fieldsErrors,setFieldsErrors] = useState({
        number:{status:false,message:""},
        password:{status:false,message:""},
        fio:{status:false,message:""},
        role:{status:false,message:""},
        birthdate:{status:false,message:""}
    })
    const [fields,setFields] = useState({
        number:'',
        password:'',
        fio:'',
        role:'',
        birthdate:''
    })
    
    const handleClosePersonalModal = () => {
        dispatch(setPersonalModal(false))
    }
    const handleChange = (attribute, value) => {

        if(attribute==='number'){
            value = value.replace(/\D/g, '')
            value = value.slice(0, 11)
        }

        setFields(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }
    const create = (event) => {
        event.preventDefault()
        let errors = false

        if (fields.number === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setFieldsErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }

        if (fields.role === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                role: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setFieldsErrors(prevState => ({
                ...prevState,
                role: {status:false, message:''}
            }));
        }

        if (!new RegExp(/^7\d{10}$/).test(fields.number)) {
            setFieldsErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Некорректный номер телефона'}
            }));
            errors=true
        }
        else{
            setFieldsErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }
        
        if (fields.password === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                password: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setFieldsErrors(prevState => ({
                ...prevState,
                password: {status:false, message:''}
            }));
        }

        if (!new RegExp(/^([A-Za-zА-Яа-яЁё]+\s){1,2}[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/).test(fields.fio) || fields.fio === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                fio: {status:true, message:'* Некорректный формат ФИО'}
            }));
            errors=true
        }
        else{
            setFieldsErrors(prevState => ({
                ...prevState,
                fio: {status:false, message:''}
            }));
        }

        if (!fields.birthdate) {
            setFieldsErrors(prevState => ({
                ...prevState,
                birthdate: { status: true, message: '* Обязательное поле' }
            }))
            errors = true

        }
        else {
            const today = new Date();
            const birthdateObj = new Date(fields.birthdate);
            const age = today.getFullYear() - birthdateObj.getFullYear();
        
            if (age < 14) {
                setFieldsErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Минимальный возраст 14 лет' }
                }))
                errors = true
            } 
            else if (age >= 100) {
                setFieldsErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Максимальный возраст 99 лет' }
                }))
                errors = true
            }
            else{
                setFieldsErrors(prevState => ({
                    ...prevState,
                    birthdate: {status:false, message:''}
                }));
            }
        }

        if(!errors){
            setLoading(true)
            createUser(fields.number,fields.password,fields.fio,fields.role,fields.birthdate).then((res)=>{
                if(!res){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:'Непредвиденная ошибка, попробуйте позже'
                    }))
                    setLoading(false)
                }
                else if(res.status==='error'){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:res.data.message.join('\n')
                    }))
                    setLoading(false)
                }
                else{
                    dispatch(setPersonalModal(false))
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    props.onCreate()
                    setLoading(false)
                    setFields({
                        number:'',
                        password:'',
                        fio:'',
                        role:'',
                        birthdate:'',
                    })
                }
            })
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={PersonalModalStatus}
            onClose={handleClosePersonalModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{boxSizing:'border-box'}}
        >
            <Box sx={{...modal,height:'100%',minHeight:'450px',maxWidth:'350px',justifyContent:'start',flexDirection:'column'}}>
                
                <IconButton
                    aria-label="close"
                    onClick={handleClosePersonalModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex:333,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>

                <Box sx={{...font,fontSize:'22px',mt:2,mb:4}}>Новый сотрудник</Box>

                <Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                    {
                        loading
                        ?
                        <Box sx={{widht:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <CircularProgress color={'primary'}/>
                        </Box>
                        :
                        <Box sx={{width:'100%'}}>
                        <FormTextFieldComponent 
                            type={'tel'}
                            error={fieldsErrors.number}
                            label={'Номер телефона'}
                            value={fields.number}
                            placeholder={"+7 (___) ___-__-__"}
                            onChange={(e) => handleChange('number',e.target.value)}
                        />
                        <FormTextFieldComponent 
                            type={'password'}
                            error={fieldsErrors.password}
                            label={'Пароль'}
                            value={fields.password}
                            onChange={(e) => handleChange('password',e.target.value)}
                        />
                        <FormTextFieldComponent 
                            type={'text'}
                            error={fieldsErrors.fio}
                            label={'ФИО'}
                            value={fields.fio}
                            onChange={(e) => handleChange('fio',e.target.value)}
                        />
                        <FormTextFieldComponent 
                            type={'text'}
                            error={fieldsErrors.role}
                            label={'Роль'}
                            value={fields.role}
                            onChange={(e) => handleChange('role',e.target.value)}
                        />
                        <FormTextFieldComponent 
                            type={'date'}
                            error={fieldsErrors.birthdate}
                            label={'Дата рождения'}
                            value={fields.birthdate}
                            onChange={(e) => handleChange('birthdate',e.target.value)}
                        />
                        </Box>
                    }
                    <Button disabled={loading} onClick={create} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Создать</Button>
                </Box>
            </Box>
        </Modal>
  )
}

export default PersonalModal