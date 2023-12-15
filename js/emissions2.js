document.addEventListener("DOMContentLoaded", function () {
    // Dynamically load JSON data using fetch
    fetch('mockData.json') // Replace with the actual endpoint or file path
        .then(response => response.json())
        .then(jsonData => {
            // Filter data for US regions
            const usRegionsData = jsonData.emissions.filter(service => service.region.startsWith('us','US'));

            // Extract data for the chart
            const labels = usRegionsData.map(service => service.region);
            const mtPerKwHour = usRegionsData.map(service => service.mtPerKwHour);

            // Create a chart using Chart.js
            const ctx = document.getElementById('test4').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'mtPerKwHour',
                        data: mtPerKwHour,
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

            // Make sure to display the chart once it's created
            myChart.update();
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});