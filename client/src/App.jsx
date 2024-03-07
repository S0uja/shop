import { useEffect} from 'react'
import { setCategories } from './store/categories.store'
import Categories from './components/Categories.component'
import Catalog from './components/Catalog.component'
import { useDispatch } from 'react-redux'
import { getAllCategories, getOneCategory } from './http/Categories.http'
import { getAllProducts } from './http/Products.http'
import ProductModal from './modals/Product.modal'
import AuthModal from './modals/Auth.modal'
import {ThemeProvider} from '@mui/material/styles';
import theme from './themes/colors.theme'
import Cart from './components/Cart.component'
import Header from './components/Header.component'
import { userCheck } from './http/User.http'
import { getAllOrders } from './http/Orders.http'
import {setUserInfo} from "./store/user.store"
import {setCart} from './store/cart.store'
import SnackbarModal from './modals/Snackbar.modal'
import Grid from '@mui/material/Unstable_Grid2'
import CartFab from './components/Fab.component'
import CartModal from './modals/Cart.modal'
import { setOrders } from './store/order.store'
import OrderModal from './modals/Order.modal'
import ProfileModal from './modals/Profile.modal'
import { setProducts, setTotalPages, setPage, setCategory, setSearch, setSearchInput, setProductsLoading } from './store/products.store'

export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const categoriesResponse = await getAllCategories()
        if (categoriesResponse) {
          dispatch(setCategories(categoriesResponse.data.data));
        }
  
        const searchParams = new URLSearchParams(window.location.search)
        const params = {}
        if(searchParams.size){
          params.page = searchParams.get('page')
          params.search = searchParams.get('search') 
          params.category = searchParams.get('category') 

          params.page = params.page==='null'?1:params.page
          params.search = params.search==='null'?null:params.search
          params.category = params.category==='null'?null:params.category

          if(params.category){
            params.category = await getOneCategory(params.category)
            params.category = params.category.data.data[0]
          }

          dispatch(setPage(parseInt(params.page)))
          dispatch(setCategory({name:params.category?.name,value:params.category?.id}))
          dispatch(setSearch(params.search))
          dispatch(setSearchInput(params.search))
        }

        const productsResponse = await getAllProducts(params?.page,params?.category,params?.search)
        if (productsResponse) {
          dispatch(setProducts(productsResponse.data.data.list))
          dispatch(setTotalPages(productsResponse.data.data.totalPages))
          dispatch(setProductsLoading(false))
        }

        const ordersResponse = await getAllOrders()
        if (ordersResponse) {
          dispatch(setOrders(ordersResponse.data.data));
        }
  
        if (localStorage.getItem('token')) {
          const userResponse = await userCheck();
          if (userResponse) {
            dispatch(setUserInfo(userResponse.data.data[0]))
          }
        }
  
        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', JSON.stringify([]))
        } 
        else {
          dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ProfileModal/>
      <OrderModal/>
      <SnackbarModal />
      <ProductModal />
      <AuthModal />
      <CartModal />
      <CartFab/>

      <Grid container columnSpacing={2} sx={{boxSizing:'border-box',m:0,maxWidth:'1500px',position:'relative'}}>
        <Grid 
          es={12} xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{display:{es:'block',xs:'block',sm:'block',md:'block',lg:'block',xl:'block'}}}
        >
          <Header />
        </Grid>
        <Grid
          es={12} xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{display:{ex:'block',xs:'block', sm:'block',md:'block',lg:'block',xl:'block'},position:'sticky',zIndex:5,top:0,backgroundColor:'#eeeeee',height:'8px'}}
        >
        </Grid>
        <Grid
          es={0} xs={0} sm={0} md={3} lg={3} xl={2}
          sx={{display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}
        >
          <Categories />
        </Grid>
        <Grid
          es={12} xs={12} sm={12} md={9} lg={9} xl={7}
        >
          <Catalog />
        </Grid>
        <Grid
          es={0} xs={0} sm={0} md={0} lg={0} xl={3}
          sx={{display:{es:'none',xs:'none',sm:'none',md:'none',lg:'block',xl:'block'}}}
        >
          <Cart />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App