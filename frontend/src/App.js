import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchScreen from './screens/SearchScreen';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3" >
        <Container >
          <AdminRoute path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <AdminRoute path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
          <AdminRoute path='/admin/productlist' component={ProductListScreen} exact/>
          <AdminRoute path='/admin/user/:id/edit' component={UserEditScreen}/>
          <AdminRoute path='/admin/userslist' component={UsersListScreen}/>
          <AdminRoute path='/admin/orderlist' component={OrderListScreen}/>
          <PrivateRoute path='/order/:id' component={OrderScreen}/>
          <PrivateRoute path='/placeorder' component={PlaceOrderScreen}/>
          <PrivateRoute path='/payment' component={PaymentScreen}/>
          <PrivateRoute path='/shipping' component={ShippingScreen}/>
          <PrivateRoute path='/profile' component={ProfileScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
{/*           <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/search/:keyword' component={HomeScreen} exact/> */}
          <Route path='/search/:category/category/page/:pageNumber' component={SearchScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={SearchScreen} exact/>
          <Route path='/search/:category/category' component={SearchScreen} exact />
          <Route path='/search/:keyword' component={SearchScreen} exact />
          <Route path='/search' component={SearchScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>


  )
}

export default App;
