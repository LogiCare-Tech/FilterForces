import React, { useState } from 'react'
import axios from 'axios'
const Train = () => {
    const [handle, setHandle] = useState('')
    const [generalSet, setAcceptedList]= useState(null)
    const ChangeInputHandle = (event) => {
        
        setHandle(event.target.value)
    }
    const handleSubmit =async(event) => {
        event.preventDefault()
        console.log("Entered handle is ", handle)
        try{
            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
        console.log(response.data.result)
        const ProblemSetInfo = response.data.result.filter((info) => {
            return info.verdict === "OK"
        })
        setAcceptedList(ProblemSetInfo)
        
        }
        catch (error){
console.log(error)
        }
       
    }
    return(
        <div>
            <h1>Enter the handle</h1>
            <form onSubmit = {handleSubmit}>
            <input value={handle} type = "text" onChange = {ChangeInputHandle}/>
            <br/>
            <button type="submit">Add Handle</button>
            </form>
        </div>
    )
}
export default Train