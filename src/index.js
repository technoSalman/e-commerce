const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db.config');
const app = express();
const router = require('./routes/routes.js');
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

const startServer = async(PORT) => {
    try{
        await sequelize.authenticate();
    }catch (error) {
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
