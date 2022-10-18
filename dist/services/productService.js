"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = void 0;
require('dotenv').config();
const productModel_1 = require("../model/productModel");
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield productModel_1.Product.findAll();
        if (allProducts) {
            return allProducts;
        }
    }
    catch (error) {
        console.log('Error in getAllProducts service ', error);
        throw error;
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productById = yield productModel_1.Product.findOne({ where: { id: id } });
        if (productById) {
            return productById;
        }
    }
    catch (error) {
        console.log('Error in getProductById service ', error);
        throw error;
    }
});
exports.getProductById = getProductById;
