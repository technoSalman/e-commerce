import express from 'express';
require('dotenv').config();
import cors from 'cors';
import sequelize from './config/db.config';
// let app: Express.Application | undefined = undefined;
const app = express();
import router from './routes/routes';
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

const startServer = async (PORT: string | undefined) => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.error(error);
	}
	app.listen(PORT, () => {
		console.log(`Server is running on port: http://localhost:${PORT}..`);
	});
};

startServer(PORT).then(() => {
	console.log('Database connected successfully');
});

sequelize.sync().then(() => {
	console.log('All tables synced successfully');
});
