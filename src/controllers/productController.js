const productService = require('../services/productService');

const allProducts = async(req,res) => {
    const { name } = req.query;
    try{
        const allProducts = await productService.getAllProducts(name);
        if(allProducts){
            return res.status(200).send({
                status: 'SUCCESS',
                data: allProducts
            });
        }
        if(!allProducts){
            return res.status(400).send({
                status: 'FAILED',
                message: 'Couldn\'t fetch data'
            });
        }
    }
    catch(error){
        return res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
};


const productById = async(req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(401).send({
            status: 'FAILED',
            message: 'id is required'
        });
    }
    try{
        const productById = await productService.getProductById(id);
        if(productById){
            res.status(200).send({
                status: 'SUCCESS',
                data: productById,
            });
        }
        if(!productById){
            res.status(401).send({
                status: 'FAILED',
                message: 'No records found'
            });
        }
    }
    catch(error){
        req.status(500).send({
            status: 'FAILED',
            message: error,
        });
    }
};



module.exports = {
    allProducts,
    productById
};