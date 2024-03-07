import React from 'react'
import SearchComponent from './Search.component'
import {Paper,Box,Typography,Pagination,PaginationItem} from '@mui/material'
import Card from './Card.component'
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
import LoadingCard from './LoadingCard.component'
import {setPage} from '../store/products.store'
import { handleRequest } from '../utils/HandleRequest.util'
import { useNavigate } from 'react-router-dom'
import { setProducts, setTotalPages, setProductsLoading } from '../store/products.store'

const Catalog = () => {
  const dispatch = useDispatch()
  const Products = useSelector(state => state.products.products)
  const ProductsLoading = useSelector(state => state.products.productsLoading)
  const TotalPages = useSelector(state => state.products.totalPages)
  const Page = useSelector(state => state.products.page)
  const navigate = useNavigate()
  const Search = useSelector(state => state.products.search)
  const Category = useSelector(state => state.products.category)
  
  const handleChangePage = async (e,value) => {
    if (value === Page) return

    dispatch(setProductsLoading(true))
    dispatch(setPage(value))

    const res = await handleRequest(value,Search,Category?.value || null,navigate)
    
    if(res.status==='error'){
      dispatch(setSnackbarModal({
          modal:true,
          severity:'error',
          message:res.data.message.join('\n') || 'Произошла ошибка'
      }))
      dispatch(setProductsLoading(false))
    }
    else{
        dispatch(setProducts(res.data.data.list))
        dispatch(setTotalPages(res.data.data.totalPages))
        dispatch(setProductsLoading(false))
    }
  }

  return (
    <Paper variant='0' sx={{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        boxSizing:'border-box',
        widht:'100%',
        borderRadius:2,
      }}
    >
        <SearchComponent />

        <Box sx={{minHeight:'50vh',pt:0}}>

          <Typography sx={{...font,fontSize:'28px',ml:2,my:2}}>Все товары</Typography>
          <Box sx={{display:'flex',pl:2,gap:2,flexWrap:'wrap'}}>
            {
              !ProductsLoading?
              Products.map((product,index) => (
                <Card
                  key={index}
                  id={product.id}
                  name={product.name}
                  image={product.product_images[0]?.filename || 'defaultProductImage.jpg'}
                  avgReview={product.avgReview || 0}
                  weight_volume={product.weight_volume}
                  price={product.price}
                />
              ))
              :
              <>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
              </>
            }
          </Box>
          
        </Box>

        <Box sx={{display:'flex',justifyContent:'center',p:2,mt:2}}>
          <Pagination page={Page} onChange={handleChangePage} count={TotalPages} shape="rounded" sx={{font}} renderItem={	(item) => <PaginationItem {...item} sx={font}/>}/> 
        </Box>

        
    </Paper>
  )
}

export default Catalog