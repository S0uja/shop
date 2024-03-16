import {useState} from 'react'
import font from "../themes/font.theme"
import modal from '../themes/modal.theme'
import {Paper,Box,Backdrop,Modal,Fade,Button,TextField,CircularProgress,Tab,IconButton} from '@mui/material'
import {TabList,TabContext,TabPanel} from '@mui/lab'
const activeTabSx = { height:'100%',p:0,boxSizing:'border-box',display:'flex',flexDirection:'column',justifyContent:'space-between' }
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModal, setSnackbarModal } from '../store/modals.store'
import { userLogin, userRegistration } from '../http/User.http'
import {setUserInfo} from "../store/user.store"
import CloseIcon from '@mui/icons-material/Close'
import SyncCart from '../utils/SyncCart.util'
import { setCart } from '../store/cart.store'
import { getCart } from '../http/Cart.http'

const AuthModal = () => {
    const [singIn,setSingIn] = useState({
        number:'',
        password:''
    })
    const [singUp,setSingUp] = useState({
        number:'',
        password:'',
        fio:'',
        birthdate:''
    })
    const [singInErrors,setsingInErrors] = useState({
        number:{status:false,message:""},
        password:{status:false,message:""}
    })
    const [singUpErrors,setsingUpErrors] = useState({
        number:{status:false,message:""},
        password:{status:false,message:""},
        fio:{status:false,message:""},
        birthdate:{status:false,message:""}
    })
    const [loading,setLoading] = useState(false)
    const [tab, setTab] = useState('1');

    const AuthModalStatus = useSelector(state => state.modals.authModal)

    const dispatch = useDispatch()

    const handleChangeTab = (event,value) => {
        setTab(value);
    }
    const handlePhoneChange = (e) => {
        let phoneNumber = e.target.value.replace(/\D/g, ''); // удаляем все символы, кроме цифр
        phoneNumber = phoneNumber.slice(0, 11); // ограничиваем длину номера телефона
        setSingUp(prevState => ({
            ...prevState,
            number: phoneNumber
        }))
        setSingIn(prevState => ({
            ...prevState,
            number: phoneNumber
        }))
    }
    const handleChangeSingUp = (attribute, value) => {
        setSingUp(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }
    const handleChangeSingIn = (attribute, value) => {
        setSingIn(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }
    const handleCloseAuthModal = () => {
        dispatch(setAuthModal(false))
    }

    const login = (event) => {
        event.preventDefault()
        let errors = false

        if (singIn.number === '') {
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }

        if (!new RegExp(/^7\d{10}$/).test(singIn.number)) {
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Некорректный номер телефона'}
            }));
            errors=true
        }
        
        if (singIn.password === '') {
            setsingInErrors(prevState => ({
                ...prevState,
                password: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }

        if(!errors){
            setsingInErrors({
                number:{status:false,message:""},
                password:{status:false,message:""}
            })
            setLoading(true)

            userLogin(singIn.number,singIn.password).then(res=>{
                if(res.status==='error'){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:res.data.message.join('\n')
                    }))
                    setLoading(false)
                }
                else{
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    dispatch(setUserInfo(res.data.data[0]))
                    dispatch(setAuthModal(false))
                    setLoading(false)
                    getCart().then(res=>{
                        SyncCart(res.data.data[0].json).then(cart=>{
                            dispatch(setCart(cart))
                        })
                    })
                }
            })
        }
    }

    const register = (event) => {
        event.preventDefault()
        let errors = false

        if (singUp.number === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }

        if (!new RegExp(/^7\d{10}$/).test(singUp.number)) {
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Некорректный номер телефона'}
            }));
            errors=true
        }
        
        if (singUp.password === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                password: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }

        if (!new RegExp(/^([А-Яа-яЁё]+\s){1,2}[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/).test(singUp.fio) || singUp.fio === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                fio: {status:true, message:'* Некорректный формат ФИО'}
            }));
            errors=true
        }

        if (!singUp.birthdate) {
            setsingUpErrors(prevState => ({
                ...prevState,
                birthdate: { status: true, message: '* Обязательное поле' }
            }))
            errors = true

        }
        else {
            const today = new Date();
            const birthdateObj = new Date(singUp.birthdate);
            const age = today.getFullYear() - birthdateObj.getFullYear();
        
            if (age < 14) {
                setsingUpErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Минимальный возраст 14 лет' }
                }))
                errors = true
            } 
            else if (age >= 100) {
                setsingUpErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Максимальный возраст 99 лет' }
                }))
                errors = true
            }
        }

        if(!errors){
            setsingUpErrors({
                number:{status:false,message:""},
                password:{status:false,message:""},
                fio:{status:false,message:""},
                birthdate:{status:false,message:""},
            })
            setLoading(true)

            userRegistration(singUp.number,singUp.password,singUp.fio,singUp.birthdate).then(res=>{
                if(res.status==='error'){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:res.data.message.join('\n')
                    }))
                    setLoading(false)
                }
                else{
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    dispatch(setUserInfo(res.data.data[0]))
                    dispatch(setAuthModal(false))
                    setLoading(false)
                    getCart().then(res=>{
                        SyncCart(res.data.data[0].json).then(cart=>{
                            dispatch(setCart(cart))
                        })
                    })
                }
            })
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={AuthModalStatus}
            onClose={handleCloseAuthModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{boxSizing:'border-box'}}
        >
            <Box sx={{...modal,minHeight:'450px',maxWidth:'350px',justifyContent:'start',flexDirection:'column'}}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseAuthModal}
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
                {
                    loading
                    ?
                    <Box sx={{widht:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                        <CircularProgress color='primary' sx={{height:'100%'}}/>
                    </Box>
                    :
                    <TabContext value={tab} sx={{flexGrow:1}}>

                        <TabList onChange={handleChangeTab} textColor='secondary' indicatorColor='secondary' sx={{mb:3}}>
                            <Tab label="Вход" value="1" sx={font} />
                            <Tab label="Регистрация" value="2" sx={font} />
                        </TabList>

                        <TabPanel value="1" sx={()=>tab==='1' && activeTabSx}>
                            <Box sx={{p:2,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <Box >
                                    <TextField
                                        type='tel'
                                        error={singInErrors.number.status}
                                        helperText={singInErrors.number.message}
                                        sx={{width:'100%',mb:2}}
                                        label="Номер телефона"
                                        variant="outlined"
                                        placeholder="+7 (___) ___-__-__"
                                        value={singIn.number}
                                        onChange={handlePhoneChange}
                                        FormHelperTextProps={{
                                            style:  { 
                                              ...font,
                                              color:'',
                                              fontSize:''
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                            ...font,
                                            color:''
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                    />
                                    <TextField
                                        error={singInErrors.password.status}
                                        helperText={singInErrors.password.message}
                                        sx={{width:'100%',mb:2}}
                                        type='password'
                                        label="Пароль"
                                        variant="outlined"
                                        value={singIn.password}
                                        onChange={(e) => handleChangeSingIn('password',e.target.value)}
                                        FormHelperTextProps={{
                                            style:  { 
                                              ...font,
                                              color:'',
                                              fontSize:''
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                            ...font,
                                            color:''
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                    />
                                </Box>
                                <Box >
                                    <Button type="submit" onClick={login} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Войти</Button>
                                </Box>
                            </Box>
                        </TabPanel>

                        <TabPanel value="2" sx={()=>tab==='2' && activeTabSx}>
                            <Box sx={{p:2,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <Box>
                                    <TextField
                                        type='tel'
                                        error={singUpErrors.number.status}
                                        helperText={singUpErrors.number.message}
                                        sx={{width:'100%',mb:2}}
                                        label="Номер телефона"
                                        variant="outlined"
                                        placeholder="+7 (___) ___-__-__"
                                        value={singIn.number}
                                        onChange={handlePhoneChange}
                                        InputLabelProps={{
                                            style: {
                                                ...font,
                                                color:'',
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                        FormHelperTextProps={{
                                            style:  { 
                                              ...font,
                                              color:'',
                                              fontSize:''
                                            }
                                          }}
                                    />
                                    <TextField
                                        error={singUpErrors.password.status}
                                        helperText={singUpErrors.password.message}
                                        sx={{width:'100%',mb:2}}
                                        type='password'
                                        label="Пароль"
                                        variant="outlined"
                                        value={singUp.password}
                                        onChange={(e) => handleChangeSingUp('password',e.target.value)}
                                        FormHelperTextProps={{
                                            style:  { 
                                                ...font,
                                                color:'',
                                                fontSize:''
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                ...font,
                                                color: '',
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                    />
                                    <TextField
                                        error={singUpErrors.fio.status}
                                        helperText={singUpErrors.fio.message}
                                        sx={{width:'100%',mb:2}}
                                        label="ФИО"
                                        variant="outlined"
                                        value={singUp.fio}
                                        onChange={(e) => handleChangeSingUp('fio',e.target.value)}
                                        FormHelperTextProps={{
                                            style:  { 
                                              ...font,
                                              color:'',
                                              fontSize:''
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                ...font,
                                                color: '',
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                    />
                                    <TextField
                                        error={singUpErrors.birthdate.status}
                                        helperText={singUpErrors.birthdate.message}
                                        sx={{width:'100%',mb:2}}
                                        type='date'
                                        label="Дата рождения"
                                        FormHelperTextProps={{
                                            style:  { 
                                              ...font,
                                              color:'',
                                              fontSize:''
                                            }
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: {
                                                ...font,
                                                color:''
                                            }
                                        }}
                                        variant="outlined"
                                        value={singUp.birthdate}
                                        onChange={(e) => handleChangeSingUp('birthdate',e.target.value)}
                                        InputProps={{
                                            style: {
                                                ...font,
                                                borderRadius: 8
                                            }
                                        }}
                                    />
                                </Box>
                                <Box >
                                    <Button type="submit" onClick={register} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Зарегистрироваться</Button>
                                </Box>
                            </Box>
                        </TabPanel>

                    </TabContext>
                }
            </Box>
        </Modal>
    )
}

export default AuthModal