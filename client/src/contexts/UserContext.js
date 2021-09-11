
import React, {createContext, useState} from "react"
export const UserContext = createContext()
const initialState = {
    name: '',
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
        <UserContext.Provider value = {{ USER :  [user, setUser],LOGIN_STATE : [loginState,setLoginState], ACCESS_KEY: [accessKey,setAccessKey]}}>
               {props.children}
        </UserContext.Provider>
    )
}
