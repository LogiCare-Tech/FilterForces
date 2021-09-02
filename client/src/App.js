import React , {useContext, useEffect} from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import Home from './components/Home'
import Train from './components/Train'
import Visualize from './components/Visualize'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Header from './components/header/Header'
import Body from './components/body/Body'
import axios from 'axios'
import { UserProvider, UserContext } from './contexts/UserContext'
const App = () => {
    
    // const [accessKey,setAccessKey] = useContext(UserContext)
    // //const [loginState, setLoginState] = useContext(UserContext)
    // const loginState = useContext(UserContext)
    // const setLoginState = useContext(UserContext)
    // const user = useContext(UserContext)
    // const setUser = useContext(UserContext)
    // const accessKey = useContext(UserContext)
    // const setAccessKey = useContext(UserContext)
  
   const [user, setUser, loginState,setLoginState,accessKey,setAccessKey] = useContext(UserContext)
    useEffect( async() => {
        const firstLogin = localStorage.getItem('firstLogin')
        
        if(firstLogin)
        { 
            console.log(loginState)
            const res = await axios.post('/api/Users/refresh_token', null)
            const userResponse = await axios.get('/api/Users/userInfo', {
                headers: {"Authorization": `${res.data.access_token}`}
            })
           
            setUser(userResponse.data)
            setLoginState(true)
           
            
        }
    }, [loginState, localStorage.getItem('firstLogin')])
    return (
        // <BrowserRouter>
        //    <div className = "whole">
               
        //    <Navbar />
            
               
        //     <div className="middleSection">
        //     {/* Switch will stop looking for matching routes once it finds the first one */}
        //     <Switch>
        //         <Route exact path="/">
        //             <Home />
        //         </Route>
        //         <Route path="/train">
        //             <Train />
        //         </Route>
        //         <Route path="/visualize">
        //             <Visualize />
        //         </Route>
        //         <Route path="/login">
        //             <Login />
        //         </Route>
        //     </Switch>
        // </div>
        //    </div>

        // </BrowserRouter>
       
        
 <Router>
          
          <div className = "App">
              <Header />
              <Body/>
           </div>
         
       </Router>
        
    )
}
export default App