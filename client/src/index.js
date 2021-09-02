import React from 'react';
import ReactDOM from 'react-dom'
import App from './App.js';
import { UserProvider } from './contexts/UserContext.jsx';
// import './styles/fun.css'
// import './styles/home.css'
import './index.css'
const Rand = () => {
    return(
        <UserProvider>
<App/>
        </UserProvider>
    )
}
ReactDOM.render(<Rand/>, document.getElementById('root'));
