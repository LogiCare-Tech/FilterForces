import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { showErrMsg,showSuccessMsg } from '../../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../../../utils/validation/Validation'
import axios from 'axios'
const initialState = {
    username:'',
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
const Register = () => {
    const [user, setUser] = useState(initialState)

    const { username,name, email, password,cf_password, err, success } = user
    
    const handleChangeInput = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password) || isEmail(username))
        {
            
            return setUser({...user, err: "Please fill in all fields", success: ''})
        }
        if(!isEmail(email))
        {
            return setUser({...user, err: "Invalid email. ", success: ''})
        }
        if(!isLength(password))
        {
            return setUser({...user, err: "Password must be atleast 6 characters. ", success: ''})
        }
        if(!isMatch(password, cf_password))
        {
            return setUser({...user, err: "Password did not match", success: ''})
        }
        try{
           
           
            const res = await axios.post('/api/Users/register', {
                username, name,email, password
             })
           
        
            setUser({...user, err: '', success: res.data.msg})
           
        }catch(err){
            err.response.data.msg &&
            setUser({...user,  err: err.response.data.msg, success: ''})
        }
    } 
    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit = {handleSubmit}>
            <div>
                    <label htmlFor="username">Enter your Codeforces handle</label>
                    <input
                        type="text"
                        placeholder="Enter your handle"
                        id="username"
                        value={username}
                        name="username"
                        onChange = {handleChangeInput} />
                </div>
            <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        value={name}
                        name="name"
                        onChange = {handleChangeInput} />
                </div>
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
                <div>
                    <label htmlFor="cf_assword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        id="cf_password"
                        value={cf_password}
                        name="cf_password"
                        onChange = {handleChangeInput} />
                </div>
                <div className = "row">
                    <button type = "submit">Register</button>
                  
                </div>
            </form>
            <p>Already have an account? <Link to = "/login">Login</Link> </p>
        </div>
    )
}
export default Register