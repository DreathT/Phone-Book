import express from 'express';
import cors from 'cors';
import { connectDatabase } from './configs/dbConfig.js';
import globalConfig from './configs/globalConfig.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import ErrorMiddleware from './middlewares/errors.js';

const app = express();

// Connecting Database
connectDatabase();

// Use Libraries
app.use(cors())
app.use(express.json())
app.use(cookieParser());

// Use all routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

// Use Error Middleware
app.use(ErrorMiddleware);


const port = globalConfig.port || 5000;
const server = app.listen(port, () => {
    console.log(`Server started on PORT: ${port} in ${globalConfig.environment}`);
});