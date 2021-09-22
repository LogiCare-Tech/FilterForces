import React, { useState } from "react";

function AddNewRange({setCurrentRange}) {
    const [startRange, setStartRange] = useState("")
    const [endRange, setEndRange] = useState("")
    const [notification, setNotification] = useState([])
    const handleRangeSubmit = (event) => {
        event.preventDefault()

        if (startRange.length === 0 || endRange.length === 0 || Number(startRange) > Number(endRange)) {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Invalid range.. Try something like 1200 - 1500`, "red"])
        }
        else {
         
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Filter ${startRange} - ${endRange} is added`, "green"])
            setCurrentRange([startRange, endRange])
        }

    }
    const clearRange = (event) => {
        event.preventDefault()
        if (startRange.length === 0 || endRange.length === 0) {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Invalid range`, "red"])
        }
        else {
         
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Filter ${startRange} - ${endRange} is removed`, "green"])
            setStartRange('')
            setEndRange('')
            setCurrentRange([])
        }

    }
    return (
        <div className="LEFT">
            {notification.length === 2 &&
                <div className="Notification" style={{ backgroundColor: notification[1] }}>
                    <h3> {notification[0]}</h3>
                </div>
            }
            <form className="RangeInputForm">
                <h3>Enter the difficutly range</h3>
                <div className="RangeInput">
                    <input value={startRange} onChange={(event) => setStartRange(event.target.value)} placeholder="From" />

                    <input value={endRange} onChange={event => setEndRange(event.target.value)} placeholder="To" />

                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>

                    <button className="ui secondary button" onClick={(e) => handleRangeSubmit(e)}>
                        Submit
                    </button>
                    <button className="ui button" onClick={(e) => clearRange(e)}>
                        Cancel
                    </button>
                </div>


            </form>

        </div>
    );
}
export default AddNewRange