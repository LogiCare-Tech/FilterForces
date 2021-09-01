import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <div className = "logo">
                <h1><Link to = "/">Filter Forces</Link></h1>
            </div>
            <ul className = "options">
                <li><Link to = "/"><i className="fas fa-chart-line"></i> Visualize</Link></li>
                <li><Link><i className="fas fa-user-ninja"></i> Train</Link></li>
                <li><Link to = "/login"><i className="far fa-user"></i> Sign in</Link></li>
            </ul>
        </header>
    )
}
export default Header