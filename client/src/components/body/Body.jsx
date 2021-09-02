import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import Train from '../Train'
import NotFound from '../notFound/NotFound'
import { UserContext } from '../../contexts/UserContext'
const Body = () => {
    const [user, setUser, loginState,setLoginState,accessKey,setAccessKey] = useContext(UserContext)
    return (
        <div>
            <section>
                <Switch>
                    <Route path="/login" component={loginState ? NotFound : Login} exact />
                    <Route path="/register" component={ loginState ? NotFound : Register} exact />
                    <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                    <Route path="/train" component={loginState ? Train : NotFound} exact />
                </Switch>
            </section>
        </div>
    )
}
export default Body