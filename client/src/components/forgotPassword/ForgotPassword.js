import React, {useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'


const ForgotPassword = () => {
   const {USER}= useContext(UserContext)
   const [user, setUser] = USER

    const { email, } = user
    
    const handleChangeInput = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
           const res = await axios.post('/api/Users/forgotPassword', {
               email: user.email
           })
           setTimeout(() => {
               setUser({err: '', success : ''})
           },1500)
           setUser({...user, err: '', success: res.data.msg})
        }catch(err){
            setTimeout(() => {
                setUser({err: '', success : ''})
            },1500)
            setUser({...user,  err: err.response.data.msg, success: ''})
        }
    } 
    
      
        return (
            <div className="login_page">
                <h2>Forgot password?</h2>
               
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            placeholder="Enter email address"
                            id="email"
                            value={email}
                            name="email"
                            onChange = {handleChangeInput} />
                    </div>
                   
                    <div className = "row">
                        <button type = "submit">Submit</button>
                       
                    </div>
                </form>
               
            </div>
        )
      
    
    
}
export default ForgotPassword