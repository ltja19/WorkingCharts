
    document.addEventListener("DOMContentLoaded", function () {
    // Dynamically load JSON data using fetch
    fetch('mockData.json') // Replace with the actual endpoint or file path
        .then(response => response.json())
        .then(jsonData => {
            // Extract data for the chart
            const labels = jsonData.footprint[0].serviceEstimates.map(service => service.serviceName);
            const kilowattHoursData = jsonData.footprint[0].serviceEstimates.map(service => service.kilowattHours);

            // Create a chart using Chart.js
            const ctx = document.getElementById('test5').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kilowatt Hours',
                        data: kilowattHoursData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
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
