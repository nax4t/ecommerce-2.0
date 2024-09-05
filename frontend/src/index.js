import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import reportWebVitals from './reportWebVitals'
import PrivateRoute from './components/PrivateRoute'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import AdminRoute from './components/AdminRoute'
import OrderListScreen from './screens/admin/OrderListScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />}></Route>
      <Route path='/product/:id' element={<ProductScreen />}></Route>
      <Route path='/cart' element={<CartScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen />}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
        <Route path='/order/:id' element={<OrderScreen />}></Route>
        <Route path='/profile' element={<ProfileScreen />}></Route>
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />}></Route>
        <Route
          path='/admin/productlist'
          element={<ProductListScreen />}
        ></Route>
        <Route
          path='/admin/product/:id/edit'
          element={<ProductEditScreen />}
        ></Route>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
