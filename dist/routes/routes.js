"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const productController_1 = require("../controllers/productController");
// const orderController = require('../controllers/orderController');
//User endpoints
router.post('/user/signup', userController_1.signup);
router.post('/user/confirmation', auth_1.verifyToken, userController_1.confirmEmail);
router.post('/user/login', userController_1.login);
router.post('/user/forgot_password', userController_1.forgotPassword);
router.patch('/user/reset_password', userController_1.resetPassword);
//Product endpoints
router.get('/products', productController_1.allProducts);
//Order endpoints
// router.post('/userOrders', auth, orderController.userOrder);
// router.get('/orders
exports.default = router;
