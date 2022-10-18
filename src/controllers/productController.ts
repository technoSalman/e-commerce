import { getAllProducts } from '../services/productService';
import { getProductById } from '../services/productService';

export const allProducts = async (req: any, res: any) => {
	try {
		const allProducts = await getAllProducts();

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
	} catch (error) {
		return res.status(500).send({
			status: 'FAILED',
			error,
		});
	}
};

export const productById = async (req: any, res: any) => {
	const id = req.params.id;
	if (!id) {
		res.status(401).send({
			status: 'FAILED',
			message: 'id is required',
		});
	}
	try {
		const productById = await getProductById(id);
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
	} catch (error) {
		req.status(500).send({
			status: 'FAILED',
			message: error,
		});
	}
};
