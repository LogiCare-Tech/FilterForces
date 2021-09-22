import React, { useState } from 'react'

const AddNewLadder = ({  setCurrentLadder, currentLadder, allLadder }) => {
    const [ladderInputField, setLadderInputField] = useState('')
    const [notification, setNotification] = useState([])
    const handleAddLadder = (event) => {
        event.preventDefault()
        const prevLadder = [...currentLadder]

  
        if (allLadder.includes(ladderInputField)) {

            if (!prevLadder.includes(ladderInputField)) {
                prevLadder.push(ladderInputField)


                setTimeout(() => {
                    setNotification([])
                }, 2500)
                setNotification([` ${ladderInputField} is added successfully`, "green"])
                setCurrentLadder([...prevLadder])
                setLadderInputField('')
            }
            else {

                setTimeout(() => {
                    setNotification([])
                }, 2500)
                setNotification([`Already added`, "red"])
            }

        }
        else {

            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Please enter the valid tag`, "red"])
        }
    }
    return (
        <div className="ladderControls">
            {notification.length === 2 &&
                <div className="Notification" style={{ backgroundColor: notification[1] }}>
                    <h3> {notification[0]}</h3>
                </div>
            }
            <h3>
                Ladders
            </h3>
            <input type="text" value={ladderInputField} onChange={(event) => setLadderInputField(event.target.value)} placeholder="Ex: A, B" />

            <button className="ui secondary button" onClick={(event) => handleAddLadder(event)}>
                Add ladder
            </button>
        </div>
    )
}
export default AddNewLadder