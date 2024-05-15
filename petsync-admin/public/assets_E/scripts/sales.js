$(document).ready(function() {
    var myChart; // Declare myChart globally to be able to clear it later
    fetchOrders(7); // Fetch data for the last 7 days by default

    $('#timePeriod').on('change', function() {
        var selectedDays = $(this).val();
        fetchOrders(selectedDays);
    });

    function fetchOrders(days){
        $.ajax({
            url: 'http://localhost:9000/get_orders_for_sales',
            method: 'GET',
            data: { days: days },
            success: function (data) {
                console.log("Data received:", data); // Check if data is received correctly

                var labels = [];
                var amounts = [];

                data.forEach(function (item) {
                    labels.push(item.Date);
                    amounts.push(item.amount_paid);
                });

                // Clear previous chart instance
                if (myChart) {
                    myChart.destroy();
                }

                // Create the chart
                const ctx = document.getElementById('myChart').getContext('2d');
                console.log("Context:", ctx); 

                myChart = new Chart(ctx, {
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
    }
});
