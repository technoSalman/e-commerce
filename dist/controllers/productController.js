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
exports.productById = exports.allProducts = void 0;
const productService_1 = require("../services/productService");
const productService_2 = require("../services/productService");
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield (0, productService_1.getAllProducts)();
        if (allProducts) {
            return res.status(200).send({
                status: 'SUCCESS',
                data: allProducts,
            });
        }
        if (!allProducts) {
            return res.status(400).send({
                status: 'FAILED',
                message: "Couldn't fetch data",
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
});
exports.allProducts = allProducts;
const productById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(401).send({
            status: 'FAILED',
            message: 'id is required',
        });
    }
    try {
        const productById = yield (0, productService_2.getProductById)(id);
        if (productById) {
            res.status(200).send({
                status: 'SUCCESS',
                data: productById,
            });
        }
        if (!productById) {
            res.status(401).send({
                status: 'FAILED',
                message: 'No records found',
            });
        }
    }
    catch (error) {
        req.status(500).send({
            status: 'FAILED',
            message: error,
        });
    }
});
exports.productById = productById;
