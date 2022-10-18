require('dotenv').config();
import { Product } from '../model/productModel';

export const getAllProducts = async () => {
	try {
		const allProducts = await Product.findAll();
		if (allProducts) {
			return allProducts;
		}
	} catch (error) {
		console.log('Error in getAllProducts service ', error);
		throw error;
	}
};

export const getProductById = async (id: any) => {
	try {
		const productById = await Product.findOne({ where: { id: id } });
		if (productById) {
			return productById;
		}
	} catch (error) {
		console.log('Error in getProductById service ', error);
		throw error;
	}
};
