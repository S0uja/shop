import React from 'react'
import font from '../themes/font.theme'
import { TextField } from '@mui/material'

const FormTextFieldComponent = (props) => {
  return (
    <TextField
        error={props.error.status}
        helperText={props.error.message}
        sx={{width:'100%',mb:2}}
        type={props.type}
        label={props.label}
        variant="outlined"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        FormHelperTextProps={{
            style:  { 
                ...font,
                color:'',
                fontSize:''
            }
        }}
        InputLabelProps={{
            shrink:true,
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
  )
}

export default FormTextFieldComponent