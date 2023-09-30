import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import { setupDatabase } from './Models/mainModel.js';
import route from './Route/api.js';
import cors from './Middleware/handleCors.js';
import handle from './Middleware/reqHttp.js';
import limitRate from './Middleware/limiter.js';

dotenv.config();
const PORT = process.env.PORT_SERVER;
const app  = express();

setupDatabase(process.env.MIGRATION);

app.use(cookieParser());
app.use(express.json());
// app.set('trust proxy', true);

app.use(cors);
app.use(limitRate)
app.use('/api/v1',route);
app.all('*',handle);


app.listen(PORT, () => {
    console.info(`Server berjalan pada Port ${PORT}`);
})