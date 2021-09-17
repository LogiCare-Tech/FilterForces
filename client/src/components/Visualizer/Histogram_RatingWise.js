import React from 'react'
import { Bar} from 'react-chartjs-2';
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
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

const Histogram = (props) => {
    let AvgTime = []
    let COLOR_First= []
    let COLOR_Second = []
    for (let value of props.RatingInfo) {
        let time = Math.ceil(props.RatingWiseAvg.get(value)[0] / props.RatingWiseAvg.get(value)[1])
        let minutes = Math.ceil(time / 60)
        //  let seconds = time - minutes * 60
        AvgTime.push(minutes)
        COLOR_First.push(rainbow(props.RatingInfo.length, AvgTime.length))
    }
    let AvgTimeType = []
    let TYPES = [...props.TypeInfo]
    TYPES.sort()
    console.log(TYPES, props.TypeInfo)
    for(let value of TYPES){
        let time = Math.ceil(props.TypeWiseAvg.get(value)[0] /  props.TypeWiseAvg.get(value)[1])
        let minutes  = Math.ceil(time/ 60)
        AvgTimeType.push(minutes)
        COLOR_Second.push(rainbow(TYPES.length, AvgTimeType.length))
    }

    var data = [{
        labels: [...props.RatingInfo],
        datasets: [
            {

                data: [...AvgTime],
                backgroundColor: [...COLOR_First],
                borderWidth: 2,
                borderColor: 'black'

            }
        ]
    }, 
{
    labels: [...TYPES],
    datasets: [
        {

            data: [...AvgTimeType],
            backgroundColor : [...COLOR_Second],
            borderWidth: 2,
                borderColor: 'black'

        }
    ]
}]
    return (
        
        <div className="Histogram">
           <div className = "HistoContainer">
           <Bar
                data={data[0]}

                options={{
                   
                   maintainAspectRation: true,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Rating vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
           </div>
           <div className = "HistoContainer">
           <Bar
                data={data[1]}

                options={{
                   
                    maintainAspectRation: true,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                       
                        },
                        title: {
                            display: true,
                            text: 'Type vs Time (in minutes)',
                            fontSize: 50
                        }
                    }
                }}
            />
           </div>
             


            </div>

         
    )

}
export default Histogram