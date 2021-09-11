import React from 'react'

const Overlay = ({ date, DateWise,setDate }) => {
    return (

        <div className="Overlay">
            <span className="Cancel-overlay" onClick={() => setDate(null)}>❌</span>
            <div>
                {

                    DateWise.get(date).map((info, index) => {
                        return (
                            (info.verdict === "OK") ?

                                <li> <a
                                    key={index}
                                    href={`https://codeforces.com/problemset/problem/${info.problem.contestId}/${info.problem.index}`}
                                    target="_blank">{info.problem.name}</a></li>
                                :
                                null

                        )
                    })
                }

            </div>

        </div>

    )
}
export default Overlay