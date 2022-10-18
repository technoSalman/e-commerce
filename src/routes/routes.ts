import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth';
import {
	signup,
	login,
	confirmEmail,
	forgotPassword,
	resetPassword,
} from '../controllers/userController';

import { allProducts } from '../controllers/productController';
// const orderController = require('../controllers/orderController');

//User endpoints
router.post('/user/signup', signup);
router.post('/user/confirmation', verifyToken, confirmEmail);
router.post('/user/login', login);
router.post('/user/forgot_password', forgotPassword);
router.patch('/user/reset_password', resetPassword);

//Product endpoints
router.get('/products', allProducts);

//Order endpoints
// router.post('/userOrders', auth, orderController.userOrder);
// router.get('/orders
export default router;
