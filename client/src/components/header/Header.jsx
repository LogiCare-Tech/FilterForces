import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

const Header = () => {
    const [user, setUser, loginState, setLoginState, accessKey, setAccessKey] = useContext(UserContext)
    const handleLogout = async () => {
        try {
            await axios.get('/api/Users/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
            setUser({name: ''})
            setLoginState(false)
        } catch (err) {
            window.location.href = "/"
        }
    }
    return (
        <header>
            <div className="logo">
                <h1><Link to="/">Filter Forces</Link></h1>
            </div>
            <ul className="options">

                {
                    !loginState && <li><Link to="/login"><i className="far fa-user"></i> Sign in</Link></li>
                }
                {
                    loginState &&
                    <>
                        <li><Link to="/"><i className="fas fa-chart-line"></i> Visualize</Link></li>
                        <li><Link to="/train"><i className="fas fa-user-ninja"></i> Train</Link></li>
                        <li className="personalInfo">{user.name}</li>
                        <li><Link to="/logout" onClick={handleLogout}><i className="fas fa-user"></i>Logout</Link></li>
                    </>
                }

            </ul>
        </header>
    )
}
export default Header