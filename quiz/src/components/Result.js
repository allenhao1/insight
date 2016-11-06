import React from 'react';
import {Chart} from 'react-google-charts'
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
  return (

    <div>
       <strong>{props.quizResult}</strong>!

    <div className={"my-pretty-chart-container"}>
      <Chart
        chartType="ScatterChart"
        data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
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
