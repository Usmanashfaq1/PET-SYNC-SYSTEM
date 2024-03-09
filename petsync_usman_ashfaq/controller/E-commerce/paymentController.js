const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

console.log(STRIPE_PUBLISHABLE_KEY);

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const renderBuyPage = async (req, res) => {
    try {
        res.render('buy', {
            key: STRIPE_PUBLISHABLE_KEY,
            amount: 25
        });
    } catch (error) {
        console.log(error.message);
        res.render('error');
    }
};

const payment = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Shirt', // Update with your product name
                        },
                        unit_amount: req.body.amount * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3001/success', // Update with your success URL
            cancel_url: 'http://localhost:3001/failure', // Update with your cancel URL
        });
        res.redirect(session.url);
    } catch (error) {
        console.log(error.message);
        res.render('error'); // Render an error page if payment fails
    }
};

const success = async (req, res) => {
    try {
        res.render('success');
    } catch (error) {
        console.log(error.message);
        res.render('error'); // Render an error page if rendering fails
    }
};

const failure = async (req, res) => {
    try {
        res.render('failure');
    } catch (error) {
        console.log(error.message);
        res.render('error'); // Render an error page if rendering fails
    }
};

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure,
};
