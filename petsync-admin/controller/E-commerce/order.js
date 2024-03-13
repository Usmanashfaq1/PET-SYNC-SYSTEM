const connection = require('../../config');


const path = require('path');
const fs = require('fs');

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
                product_list: order.products_list,
                quantity: order.quantity,
                status: order.status,
                amount_paid: order.amount_paid,
            };
        });

        console.log(orders);
        res.json(orders);
    });
};


// const handle_get_orders = (req, res) => {
//     const sql = `
//     SELECT deliveries_order.*, GROUP_CONCAT(products.productPicture) AS productPictures
//     FROM deliveries_order
//     LEFT JOIN products ON FIND_IN_SET(products.product_name, deliveries_order.products_list) > 0
//     GROUP BY deliveries_order.order_id    
//     `;

//     connection.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error fetching orders:', err);
//             res.status(500).json({ error: 'An error occurred while fetching orders' });
//             return;
//         }

//         const orders = result.map(order => {
//             let productsWithPictures = [];
//             if (order.productPictures && order.products_list) {
//                 const productPictures = order.productPictures.split(',');

//                 // Read images from file system and convert to base64
//                 productPictures.forEach((pictureFileName, index) => {
//                     const filePath = path.join(__dirname, '..', '..', 'upload', pictureFileName);
//                     try {
//                         const content = fs.readFileSync(filePath, { encoding: 'base64' });
//                         productsWithPictures.push({
//                             productPicture: content
//                         });
//                     } catch (err) {
//                         console.error('Error reading file:', err);
//                     }
//                 });
//             }

//             return {
//                 order_id: order.order_id,
//                 customer_name: order.customer_name,
//                 customer_email: order.customer_email,
//                 product_list: order.products_list,
//                 quantity: order.quantity,
//                 status: order.status,
//                 amount_paid: order.amount_paid,
//                 products: productsWithPictures
//             };
//         });
//         console.log(orders[0].productsWithPictures);
//         res.json(orders);
//     });
// };



load_order_page = (req, res) => {
    res.render('orders');
}

module.exports = {
    load_order_page,
    handle_get_orders,
}