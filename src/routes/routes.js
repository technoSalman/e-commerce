const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');



//User endpoints
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.post('/user/forgot_password', userController.forgotPassword);
router.patch('/user/reset_password', userController.resetPassword);
router.post('/user/confirmation', auth, userController.confirmEmail);

//Product endpoints
router.get('/products', auth, productController.allProducts);
router.get('/products/:id', auth, productController.productById);


//Order endpoints
router.post('/userOrders', auth, orderController.userOrder);
router.get('/orders', );


module.exports = router;    