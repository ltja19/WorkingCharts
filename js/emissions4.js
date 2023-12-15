document.addEventListener("DOMContentLoaded", function () {
    let myChart; // Declare myChart variable globally
    let groupedData; // Declare groupedData globally

    // Dynamically load JSON data using fetch
    fetch('mockData.json') // Replace with the actual endpoint or file path
        .then(response => response.json())
        .then(jsonData => {
            // Group data by country
            groupedData = {};
            jsonData.emissions.forEach(service => {
                const country = service.region.split('-')[0]; // Extract country from the region
                if (!groupedData[country]) {
                    groupedData[country] = [];
                }
                groupedData[country].push(service);
            });

            // Create a chart using Chart.js
            const ctx = document.getElementById('test4').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: getDefaultDatasets(groupedData, ['eu', 'us', 'asia'])
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

    // Function to get default datasets for specified countries
    function getDefaultDatasets(groupedData, countries) {
        const colors = {
            'us': 'rgba(255, 99, 132, 0.2)',
            'eu': 'rgba(54, 162, 235, 0.2)',
            'asia': 'rgba(255, 206, 86, 0.2)'
        };

        return countries.map(country => {
            const data = groupedData[country].map(service => service.mtPerKwHour);
            return {
                label: country,
                data: data,
                backgroundColor: colors[country],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            };
        });
    }
});