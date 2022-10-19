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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const db_config_1 = __importDefault(require("./config/db.config"));
// let app: Express.Application | undefined = undefined;
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes/routes"));
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
var corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/api/v1', routes_1.default);
const startServer = (PORT) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.default.authenticate();
    }
    catch (error) {
        console.error(error);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}..`);
    });
});
startServer(PORT).then(() => {
    console.log('Database connected successfully');
});
db_config_1.default.sync().then(() => {
    console.log('All tables synced successfully');
});
