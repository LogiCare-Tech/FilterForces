import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Display from './DisplayList'

const Train = () => {


    const [handle, setHandle] = useState('')

    const [listHandle, setListHandle] = useState([])

    //@updatedSet => Stores the filtered problem list
    const [updatedSet, setUpdate] = useState([])
    const triggerRender = useRef(false)


    //Input field for filters (ex: startRagne = 1300; endRange = 1500; ladderInputField = A)
    const [startRange, setStartRange] = useState('')
    const [endRange, setEndRange] = useState('')
    const [ladderInputField, setLadderField] = useState('')

    /*
    @allHandlePsetInfo => {
        "handle1": [...pset solved by the user handle1],
        "handle2": [...pset solved by the user handle2]
                 :
                 :  
    }
    */
    const [allHandlePsetInfo, setPsetInfo] = useState({})






    /*
      @personalHandle => user's handle
      @personalPsetOnCf => user's pset history
    */
    const [personalHandle, setPersonalHandle] = useState('')
    const [personalPsetOnCf, setPersonalPsetOnCf] = useState([])




    /*
        variable allTags =>Stores All topics that are present in Codeforces
                 allLadder => Stores ladders (Ex: A, B, C, D1, D2 ...)
                 allPset => Stores all problems on Codeforces platform

     */

    const [allPset, setAllPset] = useState([])
    const [allTags, setAllTags] = useState([])
    const [allLadder, setAllLadder] = useState([])


    const [permission, setPermission] = useState(0)
    const [showTag, setShowTag] = useState("Hide the tag")
    const [contentPset, setContentPset] = useState("column")
    //Notification
    const [notification, setNotification] = useState([])

    /*
         @currentLadder => Array of user filtered Ladder (Ex: ["A", "B"])

         @currentTopics => Array of user filtered Topics (Ex: ["DP", "DSU", "Graphs"])

         @currentRange => Array of size 2;  currentRange[0] => Starting range 
                                            currentRange[1] => Ending range
                                    Ex: currentRange = [1300, 1500]
                                    Indication to display all the questions in the range [1300, 1500]
    */
    const [currentLadder, setCurrentLadder] = useState([])
    const [currentTopics, setCurrentTopics] = useState([])
    const [currentRange, setCurrentRange] = useState([])



    /*
      @display => Holds the styling params
      @topicOverlay => Holds the styling params
    */
    const [display, setDisplay] = useState("flex")
    const [topicOverlay, setTopciOverlay] = useState("none")


    //Universal pset which are filtered according to Personal Handle tags 
    const [filterTagPset, setFilterTagPset] = useState([])


    //Fetching all problems from Codeforces API and distributing data to different array when page loads
    useEffect(() => {
           let source = axios.CancelToken.source()
        const find = async () => {
            try{
                const response = await axios.get(`https://codeforces.com/api/problemset.problems`, {
                    cancelToken: source.token
                })
                var AllTags = []
                var AllLadder = []
    
    
                var sets = response.data.result.problems
                for (let i = 0; i < sets.length; i++) {
                    for (let j = 0; j < sets[i].tags.length; j++) {
                        if (!AllTags.includes(sets[i].tags[j])) {
                            AllTags.push(sets[i].tags[j])
                        }
    
                    }
                    if (!AllLadder.includes(sets[i].index)) {
                        AllLadder.push(sets[i].index)
                    }
                }
                setAllLadder([...AllLadder])
                setAllTags([...AllTags])
    
                setAllPset([...response.data.result.problemStatistics])
            }
            catch(err)
            {
                   if(axios.isCancel(err))
                   {
                       console.log("fetch aborted")
                   }
                   else{
                       throw err
                   }
                   
            }
                
            
    
                
            
           
            
        }
        find()
return () =>{
    console.log("unmounting")
    source.cancel()
}
    }, [])
    // useEffect(() => {
    //     let personalStuff = personalPsetOnCf.map((info) => info.problem)
    //     console.log(personalStuff)
    //    let StopDuplicates = [...new Map(personalStuff.map(obj => [JSON.stringify(obj), obj])).values()];
    //    setUpdate([...StopDuplicates])
    // }, [personalPsetOnCf.length])

    //Below UseEffect is also controlled by triggerRender variable
    //triggerRender ? UseEffect Runs : UseEffect depends on other factors
    useEffect(() => {
        //Algorithm to Shortlist the Problems according to the user's filter

        let priorityPset = new Map()


        if (triggerRender.current === true) {

            //Set every pset priority as 0
            for (let info of filterTagPset) {
                priorityPset.set(info, 0)
            }

            if (currentRange.length === 0) {
                for (let info of filterTagPset) {


                    if (currentLadder.includes(info.index)) {
                        priorityPset.set(info, priorityPset.get(info) + 1)

                    }

                    /*If Any topics under user Filtered Topic matches with current Pset, increment the priyority
                           Ex: currentTopics: ["DP", "DSU", "Graphs"]
                               Current Pset Topics => ["Bit Masks", "DSU", "Probability"]
                               "DSU" is common in both => Increment priyority
                        */
                    if (currentTopics.length) {
                        let flag = 0

                        for (let tag of info.tags) {
                            if (currentTopics.includes(tag)) {
                                flag = 1
                            }
                        }
                        if (flag) {
                            priorityPset.set(info, priorityPset.get(info) + 1)
                            flag = 0
                        }
                    }
                }
            }


            else {


                for (let info of filterTagPset) {

                    if (info.rating >= currentRange[0] && info.rating <= currentRange[1]) {

                        //If Pset lies under rating range, increment the priyority
                        priorityPset.set(info, priorityPset.get(info) + 1)

                        //If Pset lies under user Filtered Ladder, increment the priyority
                        if (currentLadder.includes(info.index)) {
                            priorityPset.set(info, priorityPset.get(info) + 1)

                        }

                        /*If Any topics under user Filtered Topic matches with current Pset, increment the priyority
                           Ex: currentTopics: ["DP", "DSU", "Graphs"]
                               Current Pset Topics => ["Bit Masks", "DSU", "Probability"]
                               "DSU" is common in both => Increment priority
                        */
                        if (currentTopics.length) {
                            let flag = 0
                            for (let tag of info.tags) {
                                if (currentTopics.includes(tag)) {
                                    flag = 1
                                }
                            }
                            if (flag) {
                                priorityPset.set(info, priorityPset.get(info) + 1)
                                flag = 0
                            }
                        }
                    }




                }
            }






            let Priority = []
            for (let info of priorityPset.values()) {
                Priority.push(info)
            }


            let listToDisplay = []
            let maxVotes = Math.max(...Priority)


            if (currentLadder.length || currentTopics.length) {
                for (let info of priorityPset) {

                    if (maxVotes > 0 && priorityPset.get(info[0]) === maxVotes) {

                        listToDisplay.push(info[0])
                    }
                }
            }
            else {
                for (let info of priorityPset) {

                    if (priorityPset.get(info[0]) === maxVotes) {

                        listToDisplay.push(info[0])
                    }
                }
            }

            triggerRender.current = false




            let StopDuplicates = [...new Map(listToDisplay.map(obj => [JSON.stringify(obj), obj])).values()];
            if (StopDuplicates.length > 0) {
                setContentPset("row-reverse")
            }
            setUpdate([...StopDuplicates])

        }

    }, [filterTagPset, currentLadder, currentRange, currentTopics])



    /*
      Controlled input change
    */
    const handleEndRange = (event) => {
        setEndRange(event.target.value)
    }
    const handleStartRange = (event) => {
        setStartRange(event.target.value)
    }
    const ChangeInputHandle = (event) => {

        setHandle(event.target.value)
    }
    const handleLadderChange = (event) => {

        setLadderField(event.target.value)
    }
    const handlePersonalHandle = (event) => {
        setPersonalHandle(event.target.value)
    }





    /*
       Filter Controls
    */
    const handleAddLadder = (event) => {
        event.preventDefault()
        const prevLadder = [...currentLadder]

        triggerRender.current = true
        if (allLadder.includes(ladderInputField)) {

            if (!prevLadder.includes(ladderInputField)) {
                prevLadder.push(ladderInputField)


                setTimeout(() => {
                    setNotification([])
                }, 2500)
                setNotification([` ${ladderInputField} is added successfully`, "green"])
                setCurrentLadder([...prevLadder])
                setLadderField('')
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
    const handleAddTopic = (topic) => {
        const prevTopics = [...currentTopics]
        triggerRender.current = true

        if (prevTopics.includes(topic) === false) {
            prevTopics.push(topic)
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Topic ${topic} is added successfully`, "green"])
            setCurrentTopics([...prevTopics])
        }
        else {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Already added this topic`, "red"])
        }


    }
    const handleRemoveLadder = (data) => {

        triggerRender.current = true
        let listLadder = currentLadder.filter((info) => info !== data.info)
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`Ladder ${data.info} is removed successfully`, "green"])
        setCurrentLadder([...listLadder])
    }
    const handleRemoveTopic = (data => {
        triggerRender.current = true
        let listTopics = currentTopics.filter((info) => info !== data.info)
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`Ladder ${data.info} is removed successfully`, "green"])

        setCurrentTopics([...listTopics])
    })
    const handleRangeSubmit = (event) => {
        event.preventDefault()
        console.log(startRange, endRange)
        if (startRange.length === 0 || endRange.length === 0 || Number(startRange) > Number(endRange)) {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Invalid range.. Try something like 1200 - 1500`, "red"])
        }
        else {
            triggerRender.current = true
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
            triggerRender.current = true
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`Filter ${startRange} - ${endRange} is removed`, "green"])
            setStartRange('')
            setEndRange('')
            setCurrentRange([])
        }

    }
    const handleAdminUsername = async (event) => {
        event.preventDefault()

        try {

            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${personalHandle}`)


            setPermission(1)
            setPersonalPsetOnCf([...response.data.result])

        }
        catch (err) {
            setTimeout(() => {
                setNotification([])
            }, 2500)
            setNotification([`This handle does not exist`, "red"])
        }




    }
    const handleAddPerson = async (event) => {
        event.preventDefault()


        try {
            triggerRender.current = true
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



                // console.log(allHandlePsetInfo)
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

    const handleRemovePerson = (info) => {

        const data = [...listHandle]
        const filter = data.filter((name) => name !== info)
        const updatedObject = allHandlePsetInfo
        triggerRender.current = true
        delete updatedObject[info]

        let psetHolder = []
        for (let i = 0; i < listHandle.length; i++) {
            if (listHandle[i] !== info) {
                let individualPset = [...allHandlePsetInfo[listHandle[i]]]

                for (let x of individualPset) {
                    psetHolder.push(x)
                }
            }
        }
        setTimeout(() => {
            setNotification([])
        }, 2500)
        setNotification([`${info} is removed successfully`, "green"])
        setFilterTagPset(psetHolder)

        setPsetInfo(updatedObject)

        setListHandle(filter)
    }

    const handleShowTag = (event) => {
        if (showTag === "Hide the tag") {
            setShowTag("Show the tag")
        }
        else {
            setShowTag("Hide the tag")
        }
    }


    //List to display (Pset)
    const handleList = (general) => (



        general ? <Display info={general} personalInfo={personalPsetOnCf} stats={allPset} tags={allTags} ladders={allLadder} showTag={showTag} />
            : null


    )








    /*
     Style Controls
    */
    const handleTopicSubmit = (event) => {
        event.preventDefault()
        setDisplay("none")
        setTopciOverlay("flex")

    }

    const contentStyle = {
        display: `${display}`
    }
    const OverlayStyle = {
        display: `${topicOverlay}`
    }
    const manageOverlayTopic = () => {

        setDisplay('flex')
        setTopciOverlay("none")
    }



    return (
        <div>
            {notification.length === 2 &&
                <div className="Notification" style={{ backgroundColor: notification[1] }}>
                    <h3> {notification[0]}</h3>
                </div>
            }

            {

                permission >= 1 ?

                    <div className="mainField">

                        {
                            (currentLadder.length > 0 || currentTopics.length > 0 || listHandle.length > 0) &&
                            <div className="lablesFiled">
                                <h4>Applied Filters</h4>
                                {


                                    currentLadder.map((info, index) => {
                                        return (

                                            <div key={index} className="ui image label filterTag LABLE">
                                                <span>{info}</span>

                                                <i className="delete icon" onClick={() => handleRemoveLadder({ info })} />
                                            </div>
                                        )
                                    })




                                }
                                {

                                    currentTopics.map((info, index) => {
                                        return (
                                            <div key={index} className="ui image label filterTag TOPIC">
                                                <span>{info}</span>

                                                <i className="delete icon" onClick={() => handleRemoveTopic({ info })} />
                                            </div>
                                        )
                                    })

                                }

                                {

                                    listHandle.map((info, index) => {
                                        return (
                                            <div className="ui image label filterTag tagFilterName" key={index}>
                                                <span>{info}</span><i className="collapse delete icon" onClick={() => handleRemovePerson(info)} />
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        }

                        <div className="content-problemset" style={{ flexDirection: contentPset }}>

                            <div className="controls" style={contentStyle}>
                                {notification.length === 2 &&
                                    <div className="Notification" style={{ backgroundColor: notification[1] }}>
                                        <h3> {notification[0]}</h3>
                                    </div>
                                }
                                <h2 >Filters</h2>
                                <div className="LEFT">
                                    <form className="RangeInputForm">
                                        <h3>Enter the difficutly range</h3>
                                        <div className="RangeInput">
                                            <input value={startRange} onChange={(event) => handleStartRange(event)} placeholder="From" />

                                            <input value={endRange} onChange={event => handleEndRange(event)} placeholder="To" />
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




                                <div className="RIGHT">
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                                        <button className="ui select button" onClick={(event) => handleTopicSubmit(event)} style={{ margin: "0.3em" }}>
                                            Select the topic
                                        </button>

                                        <button style={{ margin: "0.3em" }} className="ui select button" onClick={(e) => handleShowTag(e)}>{showTag}</button>
                                    </div>
                                    <div>
                                        <form className="HandleInputForm">
                                            <h3>Enter the handle</h3>
                                            <input value={handle} type="text" onChange={ChangeInputHandle} />
                                            <br />
                                            <button className="ui secondary button" onClick={handleAddPerson}>
                                                Add Handle
                                            </button>


                                        </form>



                                        <div className="ladderControls">

                                            <h3>
                                                Ladders
                                            </h3>
                                            <input type="text" value={ladderInputField} onChange={(event) => handleLadderChange(event)} placeholder="Ex: A, B" />

                                            <button className="ui secondary button" onClick={(event) => handleAddLadder(event)}>
                                                Add ladder
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>




                            <div className="overlayForTopics" style={OverlayStyle}>
                                <button onClick={() => manageOverlayTopic()}>
                                    ❌
                                </button>
                                {
                                    allTags.map((i, index) => <p key={index} onClick={() => handleAddTopic(i)}>{i}</p>)
                                }
                            </div>
                            <div className="content" style={contentStyle}>

                                {
                                    updatedSet.length > 0 ?
                                        handleList(updatedSet)
                                        :
                                        <h3 style={{ marginLeft: "auto", marginRight: "auto", color: "snow" }}>Please Add the handles to begin</h3>



                                }







                            </div>
                        </div>

                    </div>
                    :
                    < >





                        <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Enter your Codeforces Handle</h1>
                        <form onSubmit={(event) => handleAdminUsername(event)} className="INPUT">

                            <div className="ui action input ">



                                <input

                                    type="text"
                                    value={personalHandle}
                                    placeholder="Errichto"
                                    onChange={(event) => handlePersonalHandle(event)} />
                                <button className="ui icon button" onClick={(event) => handleAdminUsername(event)} type="submit">
                                    <i className="arrow right icon" />
                                </button>

                            </div>
                        </form>

                    </>

            }
        </div>
    )
}
export default Train