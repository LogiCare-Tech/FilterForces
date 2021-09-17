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
            return "TYPE"
        }
        else{
           if(isElementPresent[0].verdict === 'OK')
           {
               return "Positive TYPE"
           }
        }
          return "Negative TYPE"
      }
      return ""
      
        
    }
        const list = (INFO) => {
            
            const data = INFO.map((inf, index) => {
                return (
                    <tr key={index}  >
                      
                        <td className={checkAppropriateColor(inf)}>
                            {inf.index}
                        </td>
                        <td className = "Middle">
                            <div className = "psetDisplayStyle">
                            <a href = {`https://codeforces.com/problemset/problem/${inf.contestId}/${inf.index}` } target="_blank" rel="noopener noreferrer" className = "PROBLEM">{inf.name}</a> <span className ="smallTagDisplay" style = {{display: tagDisplay}}>{[inf.tags.map((topic)=>`${topic}; `) ]}</span>
                            </div>
                        </td>
                        <td className = "RATING">{inf.rating}</td>
                        <td className = "NumberOfPpl">🤺 x{getSolvedNumber(inf)}</td>
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