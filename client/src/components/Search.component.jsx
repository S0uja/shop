import {useState} from 'react'
import {Paper,InputBase,IconButton,Box,Chip} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import font from "../themes/font.theme"
import { useDispatch, useSelector } from 'react-redux'
import {setPage, setSearch, setCategory, setSearchInput, setProductsLoading} from '../store/products.store'
import { setProducts,setTotalPages } from '../store/products.store'
import { setSnackbarModal } from '../store/modals.store'
import { useNavigate } from 'react-router-dom'
import { handleRequest } from '../utils/HandleRequest.util'

const Search = () => {
  const SearchInput = useSelector(state => state.products.searchInput)
  const Search = useSelector(state => state.products.search)
  const Category = useSelector(state => state.products.category)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChangeSearch = async () => {
    if(SearchInput.trim().length === 0) return
    
    dispatch(setPage(1))
    dispatch(setSearch(SearchInput.trim()))
  }

  const handleDeleteCategory = async () => {
    dispatch(setPage(1))
    dispatch(setCategory(null))
  }

  const handleDeleteSearch = async () => {
    dispatch(setPage(1))
    dispatch(setSearch(null))
    dispatch(setSearchInput(''))
  }


  return (
    <Box sx={{
        top:8,
        position:'sticky',
        backgroundColor:'#eeeeee',
        zIndex:5
      }}
    >
      <Box sx={{
          bgcolor:'background.paper',
          borderRadius:2,
          borderBottomLeftRadius:0,
          borderBottomRightRadius:0,
          p:2,
        }}
      >
        <Paper
          component="form"
          variant='0'
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            flexGrow:1,
            height:40,
            borderRadius:2,
            backgroundColor:'#eeeeee',
            color:'rgb(166, 166, 166)'
          }}
        >
          <InputBase
            sx={{...font, ml: 1, flex: 1 }}
            placeholder="Поиск"
            value={SearchInput}
            onChange={(e)=>{
              dispatch(setSearchInput(e.target.value))
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleChangeSearch()
              }
            }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleChangeSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{display:'flex',gap:1}}>
        {
          Search && <Chip label={Search} sx={{my:1}} onDelete={handleDeleteSearch} />
        }
        {
          Category?.name && <Chip label={Category.name} sx={{my:1}} onDelete={handleDeleteCategory} />
        }
        </Box>
      </Box>
    </Box>
  )
}

export default Search