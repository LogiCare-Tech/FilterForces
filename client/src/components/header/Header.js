import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import {showErrMsg,showSuccessMsg } from '../../utils/notification/Notification'
const Header = () => {
    const {USER, LOGIN_STATE} = useContext(UserContext)
    const [user,setUser] = USER
    const { err, success } = user
    const [loginState,setLoginState] = LOGIN_STATE
   
    const handleLogout = async () => {
        try {
            await axios.get('/api/Users/logout')
            localStorage.removeItem('firstLogin')
            setUser({ name: '', success: "Logged out" })
            setLoginState(false)
            setTimeout(() =>{
                window.location.href = "/"
            },1000)
            
            
        } catch (err) {
            setUser({err: "Something went wrong..."})

            setTimeout(() =>{
                window.location.href = "/"
            },1000)
        }
    }
    return (
        <>
        <header>
            <div className="logo">
               <h1 ><Link to="/"><img style = {{width: "15%"}} src = "https://lh3.googleusercontent.com/whWdCHvpK52qWkxadxxRiATHijar8KkJZCHtmwa3KeLyzf1hT3jqIGKE5FTJvvrmWWxneg1CGQ7VuQ624HKy=s72-rwa" alt = "SVG"/> Filter <span className = "HalfLogo"> Forces</span></Link></h1>
            </div>
            <ul className="options">

                {
                    !loginState && 
                    <>
                     <li><Link to="/train"><i className="fas fa-user-ninja"></i> Train</Link></li>
                    <li><Link to="/Visualize"><i className="fas fa-chart-line"></i> Visualize </Link></li>
                       
                    <li><Link to="/login"><i className="far fa-user"></i> Sign in</Link></li>
                        
                        </>
                }
                {
                    loginState &&
                    <>
                       
                        <li><Link to="/train"><i className="fas fa-user-ninja"></i> Train</Link></li>
                      
                        <li><Link to="/Visualize"><i className="fas fa-chart-line"></i> Visualize </Link></li>
                         
                         
                         
                          <li  className = "gate"><Link to="/logout" onClick={handleLogout}><i className="fas fa-user"></i>Logout</Link></li>



                    </>
                }

            </ul>
        </header>
         {err && showErrMsg(err)}
         {success && showSuccessMsg(success)}
         </>
    )
}
export default Header