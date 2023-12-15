document.addEventListener("DOMContentLoaded", function () {
    let jsonData; // Variable to store the JSON data

    // Dynamically load JSON data using fetch
    fetch('mockData.json') // Replace with the actual endpoint or file path
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Store the data for later use
            updateChart('us'); // Initial chart display for the US
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });

    // Function to update the chart based on the selected country
    window.changeChartData = function (country) {
        const countryData = jsonData.emissions.filter(service => service.region.startsWith(country));
        const labels = countryData.map(service => service.region);
        const mtPerKwHour = countryData.map(service => service.mtPerKwHour);

        // Remove the previous chart if it exists
        if (window.myChart) {
            window.myChart.destroy();
        }

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

        // Remove the previous chart if it exists
        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = myChart; // Store the chart for later destruction
    };
});