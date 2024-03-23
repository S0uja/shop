import {Chip,Box} from '@mui/material'

const ChipBarComponent = (props) => {
  return (
    <Box sx={{display:'flex',gap:1}}>
        {
          props.chips.map((item)=>{
            if(item?.value){
                return (
                    <Chip label={item.value} onDelete={item.handleDelete} />
                )
            }
            else{
                return (<></>)
            }
          })
        }
    </Box>
  )
}

export default ChipBarComponent