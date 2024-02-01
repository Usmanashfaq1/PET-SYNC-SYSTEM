



load_admin_products_page = (req, res) => {
    res.render('admin_products');
} 



load_admin_page = (req, res) => {
    res.render('admin_dashboard');
} 

module.exports = {
    load_admin_page,
    load_admin_products_page,
}