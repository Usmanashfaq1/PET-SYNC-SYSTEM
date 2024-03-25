const connection = require('../../config');

const handle_get_orders = (req, res) => {
    const sql = `
    SELECT *
    FROM deliveries_order    
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({ error: 'An error occurred while fetching orders' });
            return;
        }

        const orders = result.map(order => {
            return {
                order_id: order.order_id,
                customer_name: order.customer_name,
                customer_email: order.customer_email,
                status: order.status,
                amount_paid: order.amount_paid,
            };
        });

        console.log(orders);
        res.json(orders);
    });
};



load_order_page = (req, res) => {
    res.render('orders');
}

module.exports = {
    load_order_page,
    handle_get_orders,
}