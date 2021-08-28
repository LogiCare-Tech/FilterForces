import React, {createContext, useState,useEffect} from "react"
const context = createContext(null)

const UserProvider = ({children})=>{
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch("/user")
        .then(response => response.json())
        .then(response => setUser(response))
        .catch(error)
        {
            console.log(error)
        }
    }, [])
    return(
        <context.Provider value = {user}>
{children}
        </context.Provider>
    )
}
UserProvider.context = context
export default UserProvider