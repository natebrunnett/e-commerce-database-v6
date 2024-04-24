const express = require('express'), app = express(), mongoose = require('mongoose'); 
/*console.log prints to gitbash terminal*/ mongoose.set('debug',true); 
app.use(express.urlencoded({extended:true}));app.use(express.json())
mongoose.set('strictQuery', false);

/*Cors get req.body*/ const cors = require('cors'); app.use(cors())

require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 3030;

async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
}}connecting()
    
    //Ecommerce
    // app.use('/payment', require('./E-commerce/routes/payment.route.js'));
    // app.use('/Products', require('./E-commerce/routes/productRoutes.js'));
    //Blog
    // app.use('/feed', require('./Blog/routes/feed-routes.js'))

    //Public Users
    app.use('/users', require('./users-routes.js'))

    //TodoApp
    app.use('/todos', require('./todos-routes.js'))

    //fetch photos from server folder
    const path = require('path');
    app.use('/assets', express.static(path.join(__dirname, 'static')))
    app.use('/products/', require('./products-routes.js'));
    
    /*cyclic start*/
    // app.use(express.static(__dirname));
    // app.use(express.static(path.join(__dirname, '../client/build')));
    
    // app.get('/*', function (req, res) {
    //   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    // });
    /*cyclic end*/
    
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))