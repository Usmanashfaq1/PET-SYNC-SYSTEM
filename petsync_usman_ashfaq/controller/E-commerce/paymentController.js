
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

            if (lineItems.length > 0) {
                
                const customer = await stripe.customers.create({
                    email: req.body.email,
                    name: req.body.name,
                });

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: 'http://localhost:3001/Load_shop_page',
                    cancel_url: 'http://localhost:3001/failure',
                    shipping_address_collection: {
                        allowed_countries: ['PK'] // ISO 3166-1 alpha-2 country code (e.g., 'PK' for Pakistan)
                    },
                    customer: customer.id
                });
                
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
