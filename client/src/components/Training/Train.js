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
    const [allProblems, setAllProblems] = useState([])

    const [permission, setPermission] = useState(0)




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

        const find = async () => {

            const response = await axios.get(`https://codeforces.com/api/problemset.problems`)

            const AllTags = []
            const AllLadder = []


            let sets = response.data.result.problems
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
            setAllProblems([...sets])
            setAllPset([...response.data.result.problemStatistics])
        }
        find()
    }, [])


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
           

            else{

            
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


            if (currentLadder.length  || currentTopics.length) {
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
           
            setUpdate([...listToDisplay])

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



                setCurrentLadder([...prevLadder])
                setLadderField('')
            }
            else {
                alert("Already added ")
            }

        }
        else {

            alert("Please enter the valid tag")
        }
    }
    const handleAddTopic = (topic) => {
        const prevTopics = [...currentTopics]
        triggerRender.current = true

        if (prevTopics.includes(topic) === false) {
            prevTopics.push(topic)
            setCurrentTopics([...prevTopics])
        }
        else {
            alert("Already added this topic")
        }


    }
    const handleRemoveLadder = (data) => {

        triggerRender.current = true
        let listLadder = currentLadder.filter((info) => info !== data.info)
        setCurrentLadder([...listLadder])
    }
    const handleRemoveTopic = (data => {
        triggerRender.current = true
        let listTopics = currentTopics.filter((info) => info !== data.info)
        setCurrentTopics([...listTopics])
    })
    const handleRangeSubmit = (event) => {
        event.preventDefault()
        console.log(startRange, endRange)
        triggerRender.current = true


        setCurrentRange([startRange, endRange])
    }
    const clearRange = (event) => {
        event.preventDefault()
        triggerRender.current = true
       
        setCurrentRange([])
    }
    const handleAdminUsername = async (event) => {
        event.preventDefault()

        try {

            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${personalHandle}`)
            setPermission(1)
            setPersonalPsetOnCf([...response.data.result])

        }
        catch (err) {
            alert("This handle doesnot exist")
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

                //  console.log("RangeFIlter length ",filterRangePset.length)
                //console.log("LadderFilter length ", filterLadderPset.length)
                setPsetInfo(newGuy)
                setListHandle(handles)
                setFilterTagPset([...list])
                setHandle('')

            }
            else {
                alert("Handle is already added")
            }

        }
        catch (error) {
            alert("Please enter the valid handle or wait for the codeforces api to accept the request")
            console.log(error)
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
        setFilterTagPset(psetHolder)

        setPsetInfo(updatedObject)

        setListHandle(filter)
    }




    //List to display (Pset)
    const handleList = (general) => (



        general ? <Display info={general} personalInfo={personalPsetOnCf} stats={allPset} tags={allTags} ladders={allLadder} />
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
        <>
            {
                permission >= 1 ?

                    <div className="mainField">


                        <div className="content-problemset" >
                            <div className="controls" style={contentStyle}>
                                <div className = "LEFT">
                                <form className="RangeInputForm">
                                    <h3>Enter the difficutly range</h3>
                                    <div className="RangeInput">
                                        <input value={startRange} onChange={(event) => handleStartRange(event)} placeholder="From" />

                                        <input value={endRange} onChange={event => handleEndRange(event)} placeholder="To" />
                                    </div>

                                    <button class="ui secondary button" onClick={(e) => handleRangeSubmit(e)}>
                                        Submit
                                    </button>
                                    <button class="ui button" onClick={(e) => clearRange(e)}>
                                        Cancel
                                    </button>


                                </form>


                               
                                </div>
                                



                               <div className = "RIGHT">
                               <form className="HandleInputForm">
                                    <h3>Enter the handle</h3>
                                    <input value={handle} type="text" onChange={ChangeInputHandle} />
                                    <br />
                                    <button class="ui secondary button" onClick={clearRange} onClick={handleAddPerson}>
                                        Add Handle
                                    </button>
                                   

                                </form>
                               <button class="ui select button" onClick={clearRange} onClick={(event) => handleTopicSubmit(event)}>
                                    Select the topic
                                </button>

                                <div className="ladderControls">
                                    <h3>
                                        Ladders
                                    </h3>
                                    <input type="text" value={ladderInputField} onChange={(event) => handleLadderChange(event)} placeholder="Ex: A, B" />

                                    <button class="ui secondary button" onClick={(event) => handleAddLadder(event)}>
                                        Add ladder
                                    </button>
                                </div>
                               </div>
                            </div>

                            {
                                (currentLadder.length > 0  || currentTopics.length > 0 || listHandle.length > 0)&&
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



                            <div className="overlayForTopics" style={OverlayStyle}>
                                <button onClick={() => manageOverlayTopic()}>
                                    Cancel
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
                                        <>
                                            <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>Please enter the handles</h1>
                                        </>


                                }







                            </div>
                        </div>

                    </div>
                    :
                    <div>





                        <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Enter the Codeforces Handle</h1>
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

                    </div>

            }
        </>
    )
}
export default Train