
import React, {createContext, useState} from "react"
export const UserContext = createContext()
const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}
export const UserProvider = (props)=>{
    const [user, setUser]= useState(initialState)
    const [loginState, setLoginState] = useState(false)
   const [accessKey, setAccessKey] = useState('')
    
    return(
        <UserContext.Provider value = {[user, setUser, loginState,setLoginState,accessKey,setAccessKey]}>
               {props.children}
        </UserContext.Provider>
    )
}
