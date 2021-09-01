import React from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import Home from './components/Home'
import Train from './components/Train'
import Visualize from './components/Visualize'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Header from './components/header/Header'
import Body from './components/body/Body'
const App = () => {
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