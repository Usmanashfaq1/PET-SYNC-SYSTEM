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
                Date: order.Date,
            };
        });

        console.log(orders);
        res.json(orders);
    });
};



handle_get_orders_for_sales = (req, res) => {
    const { days } = req.query;  
    let daysFilter = '';

    if (days === '7' || days === '30' || days === '365') {
        daysFilter = `WHERE Date >= NOW() - INTERVAL ${days} DAY`;
    }

    const sql = `
        SELECT *
        FROM deliveries_order
        ${daysFilter}
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
                Date: order.Date,
            };
        });

        console.log(orders);
        res.json(orders);
    });
};


do_update_status = (req, res) => {
    const { orderId, newStatus } = req.body;

    const sql = `
    UPDATE deliveries_order
    SET status = ?
    WHERE order_id = ?
    `;
    
    connection.query(sql, [newStatus, orderId], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            res.status(500).json({ error: 'An error occurred while updating status' });
            return;
        }

        console.log('Status updated successfully');
        res.status(200).json({ message: 'Status updated successfully' });
    });
};


load_order_page = (req, res) => {
    res.render('orders');
}

module.exports = {
    load_order_page,
    handle_get_orders,
    handle_get_orders_for_sales,
    do_update_status
}