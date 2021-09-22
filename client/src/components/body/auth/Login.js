import React, {useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactGa from 'react-ga'
import { UserContext } from '../../../contexts/UserContext'
import axios from 'axios'


const Login = () => {
    useEffect(() => {
        ReactGa.initialize("UA-207957581-1")
        ReactGa.pageview(window.location.pathname) 
        alert(`sending data ${window.location.pathname}`)
    }, [])
    const {USER, LOGIN_STATE} = useContext(UserContext)
    const [user,setUser] = USER
   
    const {setLoginState} = LOGIN_STATE

    const { email, password } = user
    
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
        
           
                localStorage.setItem('firstLogin', true)
                setUser({...user, err: '', success: res.data.msg})
                window.location.href = "/"
           
              
              
              
                setLoginState(true)
              
                
               
               
         
         
        }catch(err){
           if(err.response)
           {
               setTimeout(() =>{
                   setUser({err: '', success: ''})
               },1500)
            setUser({...user,  err: err.response.data.msg, success: ''})
           }
            
        }
    } 
    
      
        return (
            <div className="login_page">
                <h2>Login</h2>
                {/* {err && showErrMsg(err)}
                {success && showSuccessMsg(success)} */}
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
                        <Link to = "/forgotPassword">Forgot passowrd</Link>
                    </div>
                </form>
                <p>New to here? <Link to = "/register">Register</Link> </p>
            </div>
        )
      
    
    
}
export default Login