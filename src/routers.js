import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Home from "./views/home"
import Login from "./views/login"
import Bag from "./views/bag"
import Products from "./views/products"
import Inventory from "./views/inventory"
import SignUp from "./views/signup"
import ProfileSeller from "./views/profileSeller"
import ProfileCustomer from "./views/profileCustomer"
import ShippingAddress from "./views/shippingaddress"
import PrivateRoute from "./router.auth"
import { useSelector } from 'react-redux';

function Routers() {
    const { isAuth } = useSelector((state) => state.users)
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/shippingaddress">
                    {isAuth ? <ShippingAddress /> : <Redirect to="/login" />}
                </Route> 
                <PrivateRoute exact path="/profilecustomer">
                    {isAuth ? <ProfileCustomer /> : <Redirect to="/login" />}
                </PrivateRoute>
                <PrivateRoute exact path="/profileseller">
                    {isAuth ? <ProfileSeller /> : <Redirect to="/login" />}
                </PrivateRoute>
                <Route exact path="/inventory">
                    {isAuth ? <Inventory /> : <Redirect to="/login" />}
                </Route>
                <PrivateRoute path="/bag">
                    {isAuth ? <Bag /> : <Redirect to="/login" />}
                </PrivateRoute>
                <Route path="/products/:produk_nama" component={Products} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers