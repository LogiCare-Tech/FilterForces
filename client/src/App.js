import React , {useContext, useEffect} from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import ReactGa from 'react-ga'
import Header from './components/header/Header'
import Body from './components/body/Body'

import { UserContext } from './contexts/UserContext'
const App = () => {
   
    useEffect(() => {
        ReactGa.initialize("UA-207957581-1")
        ReactGa.pageview(window.location.pathname) 
       
    }, [])
   const {LOGIN_STATE} = useContext(UserContext)
   
    const [loginState,setLoginState] = LOGIN_STATE
  
   
    useEffect( () => {
        const dummy = async() => {
             let firstLogin = localStorage.getItem('firstLogin')
           
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