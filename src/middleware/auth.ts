require('dotenv').config();
import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-undef
const config = process.env;

export const verifyToken = (req: any, res: any, next: () => void) => {
	const token =
		req.params.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(403).send('No token found');
	}
	try {
		req.user = jwt.verify(token, config.TOKEN_KEY as jwt.Secret);
	} catch (error) {
		return res.status(401).send('Invalid token');
	}
	next();
};
