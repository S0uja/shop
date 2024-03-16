import {useState,useEffect} from 'react'
import SearchComponent from './Search.component'
import {Paper,Box,Typography,Pagination,PaginationItem,Card} from '@mui/material'
import CardComponent from './Card.component'
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
import LoadingCard from './LoadingCard.component'
import {setPage} from '../store/products.store'
import { handleRequest } from '../utils/HandleRequest.util'
import { useNavigate } from 'react-router-dom'
import { setProducts, setTotalPages, setProductsLoading,setCollections } from '../store/products.store'
import CardCategory from './CardCategory.component'
import { getMainPage } from '../http/Products.http'

const Catalog = () => {
  const dispatch = useDispatch()
  const Products = useSelector(state => state.products.products)
  const Collections = useSelector(state => state.products.collections)
  const [loading, setLoading] = useState(true)
  const TotalPages = useSelector(state => state.products.totalPages)
  const Page = useSelector(state => state.products.page)
  const navigate = useNavigate()
  const Search = useSelector(state => state.products.search)
  const Category = useSelector(state => state.products.category)


  //ХУК ОТВЕЧАЮЩИЙ ЗА ПОИСК ТОВАРОВ
  useEffect(() => {
    const updateProducts = async () => {
      setLoading(true)

      if(!Search && !Category?.value){
        const mainPageResponse = await getMainPage()
        navigate('/')
        dispatch(setCollections(mainPageResponse.data.data.list))
        dispatch(setTotalPages(0))
        dispatch(setProductsLoading(false))
      }
      else{
        const res = await handleRequest(Page,Search,Category?.value||null,navigate)  
        if(res.status==='error'){
          dispatch(setSnackbarModal({
              modal:true,
              severity:'error',
              message:res.data.message.join('\n') || 'Произошла ошибка'
          }))
        }
        else{
            dispatch(setProducts(res.data.data.list))
            dispatch(setTotalPages(res.data.data.totalPages))
        }
      }
      
      setLoading(false)
    }
    updateProducts()
  }, [Search, Category, Page])


  const handleChangePage = async (e,value) => {
    if (value === Page) return
    dispatch(setPage(value))
  }


  return (
    <Paper variant='0' sx={{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        width:'100%',
        boxSizing:'border-box',
        borderRadius:2,
        position:'relative'
      }}
    >
        <SearchComponent />

        {
          !!Products.length>0 && (
            <Box sx={{minHeight:'50vh',pt:0}}>
              
              <Box sx={{display:'flex',pl:2,gap:2,flexWrap:'wrap'}}>
                <Typography sx={{...font,fontSize:'24px',my:2,width:'100%'}}>Все товары</Typography>
                {
                  !loading?
                  Products.map((product,index) => (
                    <CardComponent
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
          )
        }
        {
          !!Collections.length>0 && (
            <Box sx={{minHeight:'50vh',mb:2}}>

              <Box sx={{display:'flex',pl:2,gap:2,flexWrap:'wrap'}}>
                <Typography sx={{...font,fontSize:'24px',width:'100%',my:2}}>Категории</Typography>
                {
                  Collections[0].cards.map((card,index) => (
                    <CardCategory
                      key={index}
                      id={card.id}
                      name={card.name}
                      image={card.filename || 'defaultProductImage.jpg'}
                    />
                  ))
                }
              </Box>
              <Box sx={{display:'flex',pl:2,gap:2,flexWrap:'wrap'}}>
                {
                  Collections[0].collections.map((collection,index) => (
                    <>
                      <Typography sx={{...font,fontSize:'24px',width:'100%',my:2}}>{collection.name}</Typography>
                      {
                        collection.collection_products.map((product,index)=>(
                          <CardComponent
                            key={index}
                            id={product.product.id}
                            name={product.product.name}
                            image={product.product.product_images[0]?.filename || 'defaultProductImage.jpg'}
                            avgReview={product.product.avgReview || 0}
                            weight_volume={product.product.weight_volume}
                            price={product.product.price}
                          />
                        ))
                      }
                    </>
                  ))
                }
              </Box>
              
            </Box>
          )
        }
        {
          Collections.length===0 && Products.length===0 ?
          <Box sx={{minHeight:'50vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Typography sx={{...font,px:14,height:'120px',color:'rgb(120, 120, 120)',textAlign:'center',fontSize:'24px',width:'100%',my:2}}>Товары не найдены</Typography>
          </Box>
          :
          <></>
        }
        {
          !!TotalPages>0 && (
            <Box sx={{display:'flex',justifyContent:'center',p:2,mt:2}}>
              <Pagination page={Page} onChange={handleChangePage} count={TotalPages} shape="rounded" sx={{font}} renderItem={	(item) => <PaginationItem {...item} sx={font}/>}/> 
            </Box>
          )
        }
        
    </Paper>
  )
}

export default Catalog