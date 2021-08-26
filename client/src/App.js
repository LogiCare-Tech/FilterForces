import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './components/Home'
import Train from './components/Train'
import Visualize from './components/Visualize'
import Navbar from './components/Navbar'
import Login from './components/Login'
const App = () => {
    return (
        <BrowserRouter>
           
                <Navbar />
            
               
                <div className="middleSection">
                {/* Switch will stop looking for matching routes once it finds the first one */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/train">
                        <Train />
                    </Route>
                    <Route path="/visualize">
                        <Visualize />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>

        </BrowserRouter>
    )
}
export default App