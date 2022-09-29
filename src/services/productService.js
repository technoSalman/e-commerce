require('dotenv').config();
const Product = require('../model/productModel');

const getAllProducts = async(name) => {
    try{
        if(name == null){
            const allProducts = await Product.findAll();
            if(allProducts){
                return allProducts;
            }
        }
        if(name != null){
            const product = await Product.findOne({where :{name: name}});
            if(product){
                return product;
            }
        }
    }
    catch(error){
        console.log('Error in getAllProducts service ', error);
        throw error;
    }
}; 


const getProductById = async(id) => {
    try{
        const productById = await Product.findOne({ where: {id: id}});
        if(productById){
            return productById;
        }
    }
    catch(error){
        console.log('Error in getProductById service ', error);
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductById
};