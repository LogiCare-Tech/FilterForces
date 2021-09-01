import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return(
        <div className = "header">
            <NavLink className = "logo" to ="/">
                Logo
            </NavLink>
           <div className= "nav-links">
          
           <NavLink className = "link" to ="/visualize">
                Visualize
            </NavLink>
            <NavLink className = "link" to ="/train">
                Train
            </NavLink>
            <NavLink className ="link" to ="/login">
                Login
            </NavLink>
           </div>
        </div>
    )
}
export default Navbar