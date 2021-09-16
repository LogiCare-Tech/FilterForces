import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import Train from '../Training/Train'
import Resume from "../Visualizer/Resume"
import NotFound from '../notFound/NotFound'
import { UserContext } from '../../contexts/UserContext'
import ForgotPassword from '../forgotPassword/ForgotPassword'
import ResetPassword from '../forgotPassword/ResetPassword'
const Body = () => {
    const {LOGIN_STATE} = useContext(UserContext)
 
    const [loginState] = LOGIN_STATE
    return (
        <div>
            <section>
                <Switch>
                    <Route path="/login" component={loginState ? NotFound : Login} exact />
                    <Route path="/register" component={ loginState ? NotFound : Register} exact />
                    <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                    <Route path = "/user/reset/:access_token" component = {ResetPassword} exact/>
                    <Route path="/train" component={Train} exact />
                    <Route path = "/Visualize" component = {Resume} exact />
                    <Route path = "/forgotPassword" component = {loginState ? NotFound : ForgotPassword} exact/>
                </Switch>
            </section>
        </div>
    )
}
export default Body