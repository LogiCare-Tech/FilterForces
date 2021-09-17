import React from 'react'

import VizSvg from '../Assets/VizSvg.svg'
import TrainSvg from '../Assets/TrainSvg.svg'
import Faltu from '../Assets/Faltu.svg'
const HomePage = () => {
    
    return (
        <div className="homeBody">
            <div className="midSection">
            <h1 style = {{textAlign:"center"}}>Introducing filterforces...</h1>
            <div className = "Addvertisement">
                 <h3>Download our Chome Extension to Visualize in-depth</h3>
                 <button onClick = {() => alert("Will be releasing soon...")}>Download now</button>
            </div>
                <div className="Video-midSection">
                     
                  
                     
                    <iframe  frameBorder="1" allow="autoplay; picture-in-picture" title="YouTube Embed"
                        src={"https://www.youtube.com/embed/tgbNymZ7vqY"}>
                    </iframe>
                   
                    <img src = {Faltu} alt = "SVG"/>
                </div>
              
                <div className="Train-midSection">
                     <img src = {TrainSvg} alt = "SVG"/>
                     <div className = "Description-middelSection">
                        <h2>Get all the questions solved by your friends</h2>
                        <h3>Enjoy by filtering problems</h3>
                     </div>
                </div>
                <div className="Viz-midSection">
              
                     <div className = "Description-middelSection">
                         <h2>Visualization</h2>
                   <ol>
                       <li><h3>Watch the Introduction video...</h3></li>
                       <li><h3>Download our Extension after logging in</h3></li>
                       <li><h3>Start solving problems by starting the timer and record the time</h3></li>
                       <li><h3>Go to Visualize Route and check your growth</h3></li>
  
                   </ol>
                     </div>
                     <img src = {VizSvg} alt = "SVG"/>
                </div>

            </div>

            <div className="footer">


                <h4><i className="linkedin icon" /> <a href="https://www.linkedin.com/in/shreenanda-p-127242147/" target="_blank" rel="noreferrer" >Linked in </a><span>      </span><i className="github icon" /> <a href="https://github.com/shreenanda-8" target="_blank" rel="noreferrer" >Github</a></h4>



            </div>
        </div>
    )
}
export default HomePage