$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:9000/get_orders_for_sales',
        method: 'GET',
        success: function (data) {
            console.log("Data received:", data); // Check if data is received correctly
            
            var labels = [];
            var amounts = [];

            // Extract data
            data.forEach(function (item) {
                labels.push(item.Date); // Assuming Date is already in the correct format
                amounts.push(item.amount_paid);
            });
            
            console.log("Labels:", labels); // Check if labels are correct
            console.log("Amounts:", amounts); // Check if amounts are correct

            // Create the chart
            const ctx = document.getElementById('myChart').getContext('2d');
            console.log("Context:", ctx); // Check if context is correct
            
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: amounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM DD, YYYY'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Sales Amount'
                            }
                        }
                    }
                }
            });
        },
        error: function (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please try again.');
        }
    });
});
