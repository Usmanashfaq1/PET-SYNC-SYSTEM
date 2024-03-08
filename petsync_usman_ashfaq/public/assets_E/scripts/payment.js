document.getElementById('paymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const response = await fetch('/initiate-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Payment initiated:', data);
            alert('Payment initiated:', data);
            // Redirect user or perform any other actions as needed
        } else {
            console.error('Error initiating payment:', response.statusText);
            // Handle error
        }
    } catch (error) {
        console.error('Error initiating payment:', error.message);
        // Handle error
    }
});
