import React, {useEffect, useRef, useState} from 'react'
import {select, line, curveCardinal} from 'd3'

//import Contact from './components/Contact'
const Visualize = () => {
    const [data, setData] = useState([23, 43, 43,51,55, 77,86,32,1])
    const svgRef = useRef()

    useEffect(() => {
       
       console.log(data)
       const svg = select(svgRef.current)
       //To draw a circle
    //    svg.selectAll("circle")
    //    .data(data)
     
    //    .join("circle")
    //    .attr("r", value => value / 2)
    //    .attr("cx", (value) => 2 * value)
    //    .attr("cy", (value) => 2 * value)
    //    .attr("fill", "yellow")
    //    .attr("stroke", "black")

    //To draw curve in x-y plane
     const myLine = line().x((value, index) => index* 50).y((value) => 150 - value).curve(curveCardinal)
       svg.selectAll("path")
       .data([data])
       .join("path")
       .attr('d', (value) =>myLine(value))
       .attr("fill", "none")
       .attr("stroke", "blue")
    }, [data])


    
    const handleExpand = () => {
        console.log("clicked")
        const updatedData = data.map((info) => info + 2)
        console.log(updatedData)
        setData([...updatedData])
       
    }
    const handleShrink = () => {
        console.log("clicked")
        const updatedData = data.map((info) => info / 2)
        console.log(updatedData)
        setData([...updatedData])
       
    }
    return(
      <React.Fragment>
      
<svg ref = {svgRef}>
           
           </svg>
         
           <button onClick = {handleExpand}>Click here to update</button>
           <button onClick = {handleShrink}>Click here to shrink</button>
      </React.Fragment>
    )
}
export default Visualize