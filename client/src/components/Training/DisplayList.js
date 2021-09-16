import React from 'react'



let tagDisplay
const Display = (props) => {
    if(props.showTag === "Hide the tag")
    {
        tagDisplay = "block"
    }
    else{
        tagDisplay = "none"
    }
    const getSolvedNumber = (INFO) => {
      const stats = props.stats.filter((info) => ((Number(INFO.contestId) === Number(info.contestId)) && (String(INFO.index) ===String(info.index))))
    
      if(stats[0])
      {
          let obj = stats[0]
          
          return obj.solvedCount
      }
        else{
           //Unusual behaviour
           //Potential bug 
            return "Unavailable"
        }
   
            
    }
    const checkAppropriateColor = (INFO) => {
       
        
      if(props.personalInfo.length)
      {
          
       
       
        const isElementPresent = props.personalInfo.filter((info) => ((info.problem.contestId === INFO.contestId) && (info.problem.index === INFO.index)))
        
        if(!isElementPresent[0])
        {
            return ""
        }
        else{
           if(isElementPresent[0].verdict === 'OK')
           {
               return "Positive"
           }
        }
          return "Negative"
      }
      return ""
      
        
    }
        const list = (INFO) => {
            
            const data = INFO.map((inf, index) => {
                return (
                    <tr key={index}  className={checkAppropriateColor(inf)}>
                      
                        <td>
                            {inf.index}
                        </td>
                        <td >
                            <div className = "psetDisplayStyle">
                            <a href = {`https://codeforces.com/problemset/problem/${inf.contestId}/${inf.index}` } target="_blank" rel="noopener noreferrer">{inf.name}</a> <p className ="smallTagDisplay" style = {{display: tagDisplay}}>{[inf.tags.map((topic)=>`${topic}; `) ]}</p>
                            </div>
                        </td>
                        <td >{inf.rating}</td>
                        <td >🤺 x{getSolvedNumber(inf)}</td>
                    </tr>
                    
                )

            })
            return data
        }
        return (
            
                   
            <div className = "TABLE">
               
                 <table className="ui celled table unstackable" >
        
                    <thead>
                        <tr>
                            <th><h2>#</h2></th>
                            <th ><h2>Problem   </h2> </th>
                            <th ><h2>Rating</h2></th>
                            <th ><i className="iconTick"/></th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            list(props.info)
                        }

                    </tbody>
                </table> 
            </div>
            
        )
    }
    export default Display