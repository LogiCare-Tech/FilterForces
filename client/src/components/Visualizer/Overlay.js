import React from 'react'

const Overlay = ({ date, DateWise,setDate }) => {
   
    return (

        <div className="Overlay">
            <span className="Cancel-overlay" onClick={() => setDate(null)}>❌</span>
             <ol className = "OverlayQn">
             {
                    DateWise &&
                    DateWise.get(date).map((info, index) => {
                        return (
                            (info.verdict === "OK") ?
                               
                                <li key={index}> <a
                                    
                                    href={`https://codeforces.com/problemset/problem/${info.problem.contestId}/${info.problem.index}`}
                                    target="_blank" rel="noreferrer"><h3>{info.problem.name}</h3></a></li>
                                :
                                null

                        )
                    })
                }

             </ol>
               
            

        </div>

    )
}
export default Overlay