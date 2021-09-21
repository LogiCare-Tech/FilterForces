import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import Train from '../Training/Train'
import PublicStats from "../Visualizer/PublicStats"
import NotFound from '../notFound/NotFound'
import { UserContext } from '../../contexts/UserContext'
import ForgotPassword from '../forgotPassword/ForgotPassword'
import ResetPassword from '../forgotPassword/ResetPassword'
import HomePage from '../HomePage'
import PersonalStats from '../Visualizer/PersonalStats'
const Body = () => {
    const {LOGIN_STATE} = useContext(UserContext)
 
    const [loginState] = LOGIN_STATE
    return (
        <div >
            <section className = "BODY">
                <Switch>
                    <Route path="/login" component={loginState ? NotFound : Login} exact />
                    <Route path = "/forgotPassword" component = {loginState ? NotFound : ForgotPassword} exact/>
                    <Route path="/register" component={ loginState ? NotFound : Register} exact />
                    <Route path = "/PersonalStats" component = {loginState ? PersonalStats: NotFound} exact />
                    <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                    <Route path = "/user/reset/:access_token" component = {ResetPassword} exact/>
                    <Route path="/train" component={Train} exact />
                    <Route path = "/ContestStats" component = {PublicStats} exact />
                    <Route path = "/" component = {HomePage} />
                   
                    
                </Switch>
            </section>
        </div>
    )
}
export default Body