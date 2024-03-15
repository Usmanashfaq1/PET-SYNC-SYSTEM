const { emit } = require('../../config');

const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);



const payment = async (req, res) => {

    try {
        const amount = parseFloat(req.body.amount);
        if (!isNaN(amount) && Array.isArray(req.body.items) && req.body.items.length > 0) {
            const lineItems = req.body.items.reduce((acc, item, index) => {
                if (index % 5 === 0 && !isNaN(parseFloat(item))) {
                    const price = parseFloat(item);
                    const productName = req.body.items[index + 1] || '';
                    const quantity = parseInt(req.body.items[index + 2]);
                    const description = req.body.items[index + 3] || '';


                    if (!isNaN(quantity) && quantity > 0) {
                        acc.push({
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: productName,
                                    description: description,
                                },
                                unit_amount: Math.round(price),
                            },
                            quantity: quantity,

                        });
                    }
                }
                return acc;
            }, []);

            const name1 = req.body.name;
            const email = req.body.email;
            // console.log(updatedList);
            if (lineItems.length > 0) {
                const customer = await stripe.customers.create({
                    email: email,
                    name: name1
                });

                // const totalQuantity = lineItems.reduce((sum, item) => sum + item.quantity, 0);

                // const productsList = lineItems.map(item => item.price_data.product_data.name);

                // Construct success URL with necessary data
                // Construct success URL with necessary data including quantities
                const successUrl = `http://localhost:3001/order_details?customer_name=${encodeURIComponent(name1)}&customer_email=${encodeURIComponent(email)}&products_list=${encodeURIComponent(JSON.stringify(lineItems))}&amount_paid=${amount}`;

                // Create Checkout Session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: successUrl,
                    cancel_url: 'http://localhost:3001/failure',
                    shipping_address_collection: {
                        allowed_countries: ['PK']
                    },
                    customer: customer.id
                });

                // Redirect to Checkout Session URL
                res.redirect(session.url);

            } else {
                console.error('No valid line items found');
                res.render('error', { message: 'No valid line items found' });
            }
        } else {
            console.error('Invalid amount or items array:', req.body.amount, req.body.items);
            res.render('error', { message: 'Invalid amount or items array' });
        }
    } catch (error) {
        console.error('Error in payment function:', error.message);
        res.render('error');
    }
};



const failure = async (req, res) => {
    try {
        res.render('failure');
    } catch (error) {
        console.log(error.message);
        res.render('error');
    }
};


module.exports = {
    payment,
    failure,
};
