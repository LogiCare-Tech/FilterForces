import React, {useState} from "react";
import axios from 'axios'
const AddNewHandle = ({listHandle, setFilterTagPset, setListHandle, setPsetInfo, allHandlePsetInfo}) => {
    const [handle, setHandle] = useState('')
    const [notification, setNotification] = useState([])
    const handleAddPerson = async (event) => {
        event.preventDefault()


        try {
          
            var handles = [...listHandle]
            if (handles.includes(handle) === false) {
                handles.push(handle)
                var alreadyExistingProblemSet = []
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)

                const ProblemSetInfo = response.data.result.filter((info) => {
                    return info.verdict === "OK"
                })


                var list = []
                for (let i = 0; i < ProblemSetInfo.length; i++) {
                    alreadyExistingProblemSet.push(ProblemSetInfo[i].problem)
                    list.push(ProblemSetInfo[i].problem)
                }

                var newGuy = {
                    ...allHandlePsetInfo
                }

                newGuy[handle] = [...alreadyExistingProblemSet]



              
                for (let i = 0; i < listHandle.length; i++) {

                    let individualPset = [...allHandlePsetInfo[listHandle[i]]]
                    for (let j = 0; j < individualPset.length; j++) {
                        list.push(individualPset[j])

                    }
                }

                setTimeout(() => {
                    setNotification([])
                }, 2500)
                setNotification([` ${handle} is added successfully`, "green"])
                setPsetInfo(newGuy)
                setListHandle(handles)
                setFilterTagPset([...list])
                setHandle('')

            }
            else {
                setTimeout(() => {
                    setNotification([])
                }, 2500)
                setNotification([` Handle is already added`, "red"])
            }

        }
        catch (error) {

            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification(["Please enter the valid handle or wait for the codeforces api to accept the request", "red"])
        }

    }
    return(
        <form className="HandleInputForm">
             {notification.length === 2 &&
                <div className="Notification" style={{ backgroundColor: notification[1] }}>
                    <h3> {notification[0]}</h3>
                </div>
            }
        <h3>Enter the handle</h3>
        <input value={handle} type="text" onChange={event => setHandle(event.target.value)} />
        <br />
        <button className="ui secondary button" onClick={(event) => handleAddPerson(event)}>
            Add Handle
        </button>


        </form>
    )
}
export default AddNewHandle