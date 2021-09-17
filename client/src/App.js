import React , {useContext, useEffect} from 'react'

import { BrowserRouter as Router } from "react-router-dom"

import Header from './components/header/Header'
import Body from './components/body/Body'

import { UserContext } from './contexts/UserContext'
const App = () => {
    
   const {LOGIN_STATE} = useContext(UserContext)
   
    const [loginState,setLoginState] = LOGIN_STATE
  
   
    useEffect( () => {
        const dummy = async() => {
            const firstLogin = localStorage.getItem('firstLogin')
           
            if(firstLogin)
            { 
            
              
                
                
                setLoginState(true)
             
             
               
                
            }
        }
        dummy()
    
    }, [loginState, setLoginState])
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