const express = require('express');
const app = express();
// const productsRouter = require('./routes/route');
const router = require('./routes/route');
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server on start for port: " + PORT))


//app.use('/get_profiles', productsRouter);