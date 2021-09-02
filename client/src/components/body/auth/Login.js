import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { showErrMsg,showSuccessMsg } from '../../../utils/notification/Notification'
import { UserContext } from '../../../contexts/UserContext'
import axios from 'axios'


const Login = () => {
    const [user, setUser, loginState,setLoginState,accessKey,setAccessKey] = useContext(UserContext)
   

    const { email, password, err, success } = user
    
    const handleChangeInput = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post('/api/Users/login', {
                email, password
            })
            setUser({...user, err: '', success: res.data.msg})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
            setLoginState(true)
        }catch(err){
            err.response.data.msg &&
            setUser({...user,  err: err.response.data.msg, success: ''})
        }
    } 
    
      
        return (
            <div className="login_page">
                <h2>Login</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            placeholder="Enter email address"
                            id="email"
                            value={email}
                            name="email"
                            onChange = {handleChangeInput} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            value={password}
                            name="password"
                            onChange = {handleChangeInput} />
                    </div>
                    <div className = "row">
                        <button type = "submit">Login</button>
                        <Link to = "/forgotPassword">Forgot your passowrd</Link>
                    </div>
                </form>
                <p>New to here? <Link to = "/register">Register</Link> </p>
            </div>
        )
      
    
    
}
export default Login