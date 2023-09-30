import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const handleCors = cors({
    credentials: true,
    origin: `http://localhost:${process.env.PORT_CLIENT}`
})

export default handleCors;