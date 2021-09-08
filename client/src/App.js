import React , {useContext, useEffect} from 'react'

import { BrowserRouter as Router } from "react-router-dom"

import Header from './components/header/Header'
import Body from './components/body/Body'
import axios from 'axios'
import { UserContext } from './contexts/UserContext'
const App = () => {
    
   
    
   const [user,setUser, loginState,setLoginState] = useContext(UserContext)
   
    useEffect( () => {
        const dummy = async() => {
            const firstLogin = localStorage.getItem('firstLogin')
           
            if(firstLogin)
            { 
                console.log(loginState)
              
                const res = await axios.post('/api/Users/refresh_token')
                const userResponse = await axios.get('/api/Users/userInfo', {
                    headers: {"Authorization": `${res.data.access_token}`}
                })
               
                setUser(userResponse.data)
                setLoginState(true)
               
                
            }
        }
        dummy()
    
    }, [loginState, localStorage.getItem('firstLogin')])
    return (
      
       
        
 <Router>
          
          <div className = "App">
              <Header />
              <Body/>
           </div>
         
       </Router>
        
    )
}
export default App