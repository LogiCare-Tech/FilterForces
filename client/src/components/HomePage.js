import React, { useEffect } from 'react'
import { googleAnalyticsActions } from '../utils/google-analytics/google-analytics-init'
import VizSvg from '../Assets/VizSvg.svg'
import TrainSvg from '../Assets/TrainSvg.svg'
import Faltu from '../Assets/Faltu.svg'

const HomePage = () => {
    useEffect(() => {
        googleAnalyticsActions.initGoogleAnalytics("UA-207957581-1")
        
    }, [])
    return (
        <div className="homeBody">
            <div className="midSection">
                <h1 style={{ textAlign: "center" }}>Introducing FilterForces...</h1>
                <div className="Addvertisement">
                    <h3>Download our Chome Extension to Visualize in-depth</h3>
                    <button onClick={() => alert("Will be releasing soon...")}>Download now</button>
                </div>
                <div className="Video-midSection">



                    <iframe frameBorder="1" allow="autoplay; picture-in-picture" title="YouTube Embed"
                        src={"https://www.youtube.com/embed/tgbNymZ7vqY"}>
                    </iframe>

                    <img src={Faltu} alt="SVG" />
                </div>

                <div className="Train-midSection">
                    <img src={TrainSvg} alt="SVG" />
                    <div className="Description-middelSection">
                        <h2>Get all of the problems solved by your friends</h2>
                        <h3>Train efficiently by filtering the problems</h3>
                    </div>
                </div>
                <div className="Viz-midSection">

                    <div className="Description-middelSection">
                        <h2>Visualization <i className="chart area icon" /></h2>
                        <ul>
                            <li><h3>Follow the steps explained in the Introduction video to set-up the extension</h3></li>
                            <li><h3>Record the time while practicing ⌛</h3></li>
                            <li><h3>Visualize your growth 📈</h3></li>


                        </ul>
                    </div>
                    <img src={VizSvg} alt="SVG" />
                </div>

            </div>

            <div className="footer">
                <div className="leftFooter">
                    <h2>About Me</h2>
                    <h5>Name: Shreenanda P</h5>
                    
                    <h5><i className="linkedin icon" /> <a href="https://www.linkedin.com/in/shreenanda-p-127242147/" target="_blank" rel="noreferrer" >Linked in </a></h5>
                    <h5><i className="github icon" /> <a href="https://github.com/shreenanda-8" target="_blank" rel="noreferrer" >Github</a></h5>
                </div>

                <div className="rightFooter">
                       <h2>Contact</h2>
                       <h5><a href = "/#" target="_blank" rel="noreferrer">Codeforces Blog </a></h5>
                       <h5>📧 filterforces.founder@gmail.com</h5>
                       <h5><i className="github icon" /> <a href="https://github.com/shreenanda-8" target="_blank" rel="noreferrer" >Github</a></h5>
                </div>
               



            </div>
        </div>
    )
}
export default HomePage