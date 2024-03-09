
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const path = require('path');
const fs = require('fs');

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const renderBuyPage = async (req, res) => {
    // try {
    //     res.render('buy', {
    //         key: STRIPE_PUBLISHABLE_KEY,
    //         amount: 25
    //     });
    // } catch (error) {
    //     console.log(error.message);
    //     res.render('error');
    // }
};



// const axios = require('axios'); // Import axios for making HTTP requests

const payment = async (req, res) => {
    try {
        const amount = parseFloat(req.body.amount);
        console.log(amount);
        if (!isNaN(amount) && Array.isArray(req.body.items) && req.body.items.length > 0) {
            const lineItems = req.body.items.reduce((acc, item, index) => {
                if (index % 5 === 0 && !isNaN(parseFloat(item))) {
                    const price = parseFloat(item);
                    const productName = req.body.items[index + 1] || '';
                    const quantity = parseInt(req.body.items[index + 2]);
                    const description = req.body.items[index + 3] || '';
                    //  const productPictureName = req.body.items[index + 4]; // Product picture name

                    if (!isNaN(quantity) && quantity > 0) {
                        //  const uploadDirectory = path.join(__dirname, '..', '..', 'upload');
                        //  const filePath = path.join(uploadDirectory, productPictureName);
                        try {
                            // const content = fs.readFileSync(filePath, { encoding: 'base64' });
                            acc.push({
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: productName,
                                        description: description,
                                        //images: [content],
                                    },
                                    unit_amount: price , // Convert to cents
                                },
                                quantity: quantity,
                            });
                        } catch (err) {
                            console.error('Error reading file:', err);
                        }
                    }
                }
                return acc;
            }, []);

            if (lineItems.length > 0) {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: 'http://localhost:3001/success',
                    cancel_url: 'http://localhost:3001/failure',
                    customer_email: req.body.email,
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
