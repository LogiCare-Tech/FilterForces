import React from 'react'
import { Doughnut} from 'react-chartjs-2';
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
        default: alert("Rainbow");
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}
const Doughnuts = (props) => {

    let AvgTimeTopic = []
   let COLOR = []
    for(let value of props.TopicInfo){
        let time = Math.ceil(props.TopicWiseAvg.get(value)[0] /  props.TopicWiseAvg.get(value)[1])
        let minutes  = Math.ceil(time/ 60)
        AvgTimeTopic.push(minutes)
        COLOR.push(rainbow(props.TopicInfo.length, AvgTimeTopic.length))
    }
    var data = {
        labels: [...props.TopicInfo],
        datasets: [
            {

                data: [...AvgTimeTopic],
                backgroundColor: [...COLOR]

            }
        ]
    }

    return (
        
        <div className="Doughnut">
           
         
            
             <div className = "DoughnutContainer">
             <Doughnut
                data={data}

                options={{
                   
                   
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position:'bottom'
                        },
                        title: {
                            display: true,
                        
                            text: 'Topic vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
             </div>
            </div>
         
    )

}
export default Doughnuts