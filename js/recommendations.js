// import Chart from 'chart.js/auto'
// import json from "./mockData.json";
//
// (async function() {
//     var json = require('./mockData.json')
//     var stringify=JSON.stringify(json.footprint[0])
//     var userobj = JSON.parse(stringify)
//     //var test =JSON.parse(json)
//     // const firstFootprint=json.footprint[0];
//     // const firstServiceEstimate=firstFootprint.serviceEstimates[1];
//     // const cost=firstServiceEstimate.cost
//
//
//     // const firstFootprint = data.footprint[0];
//     // for (const serviceEstimate of firstFootprint.serviceEstimates) {
//     //     const serviceName = serviceEstimate.serviceName;
//     //     const cost = serviceEstimate.cost}
//     // console.log("Cost:", cost)
//     // alert(cost)
//     new Chart(
//         document.getElementById('test3'),
//         {
//             type: 'line',
//             data: {
//                 labels: userobj.map(row => row),
//                 datasets: [
//                     {
//                         label: 'KilloWatt Hour Savings',
//                         data: userobj.map(row=>row)
//                     }
//                 ]
//             }
//         }
//     );
// })();

document.addEventListener("DOMContentLoaded", function () {
    // Dynamically load JSON data using fetch
    fetch('mockData.json') // Replace with the actual endpoint or file path
        .then(response => response.json())
        .then(jsonData => {
            // Extract data for the chart
            const labels = jsonData.footprint[2].serviceEstimates.map(service => service.serviceName);
            const kilowattHoursData = jsonData.footprint[2].serviceEstimates.map(service => service.kilowattHours);

            // Create a chart using Chart.js
            const ctx = document.getElementById('test3').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kilowatt Hours',
                        data: kilowattHoursData,
                        //backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        //borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});