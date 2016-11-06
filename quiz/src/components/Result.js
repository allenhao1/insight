import React from 'react';
import {Chart} from 'react-google-charts'
const request = require('request');
function Result(props) {
  // chartEvents=[
  //       {
  //         eventName : 'select',
  //         callback  : function(Chart) {
  //             // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
  //             console.log("Selected ",Chart.chart.getSelection());
  //         }
  //       }
  //     ];
  //   state={
  //     options: {
  //           title: 'Age vs. Weight comparison',
  //         hAxis: {title: 'Age', minValue: 0, maxValue: 15},
  //         vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
  //         legend: 'none'
  //     }
  //     rows: [
  //           [ 8,      12],
  //           [ 4,      5.5],
  //           [ 11,     14],
  //           [ 4,      5],
  //           [ 3,      3.5],
  //           [ 6.5,    7]
  //     ],
  //     columns: [
  //       {
  //           'type': 'number',
  //           'label' : 'Age'
  //       },
  //       {
  //           'type' : 'number',
  //           'label' : 'Weight'
  //       }
  //     ]
  //   }
  // }

  var url = "http://localhost:9000/scores?_id=" + "92d8ed46217948a4ccc4b803";
  var data = [['Time', 'Score']];
  request(url, {withCredentials: false}, function(error, response, body) {
    if (!error && response.statusCode == 200){
      var response = JSON.parse(body);
      for (var i in response) {
        console.log(response)
        console.log(response[i])
        data.push([ parseInt(new Date(response[i].datetime).getTime()) + ", " + response[i].score]);
      }
    }
  })


  return (

    <div>
       <strong>{props.quizResult}</strong>

    <div className={"my-pretty-chart-container"}>
      <Chart
        chartType="ScatterChart"
        data={[]}
        options={{}}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
       />
    </div>
    </div>


);
}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;
