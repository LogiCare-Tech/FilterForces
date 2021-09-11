import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isLength, isEmpty, isMatch } from '../../utils/validation/Validation'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [cf_password, setCfPassword] = useState('')
    const { access_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const {USER}= useContext(UserContext)
   const [user, setUser] = USER

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(password)) {
            return setUser({ ...user, err: "Please fill in all fields", success: '' })
        }

        if (!isLength(password)) {
            return setUser({ ...user, err: "Password must be atleast 6 characters. ", success: '' })
        }
        if (!isMatch(password, cf_password)) {
            return setUser({ ...user, err: "Password did not match", success: '' })
        }

        try {
            if (access_token) {
            
                const res = await axios.post('/api/Users/resetPassword', {
                    
                    password: password
                },{
                    headers: {"Authorization": access_token},
                })

                setTimeout(() => {
                    window.location.href = "/"
                }, 3000)
                setSuccess(res.data.msg)
            }
        } catch (err) {
            err.response.data.msg &&

                setErr(err.response.data.msg)
        }
    }
    const handleChangeInput = e => {
        const data = e.target.value
        if (e.target.name === "password") {
            setPassword(data)
        }
        else {
            setCfPassword(data)
        }

    }

    return (



        <div className="login_page">

            <h2>Reset your password</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="cf_assword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        id="cf_password"
                        value={cf_password}
                        name="cf_password"
                        onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <button type="submit">Reset</button>

                </div>
            </form>

        </div>
    )
}
export default ResetPassword