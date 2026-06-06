import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import githubRoutes from './routes/githubRoutes.js';

const app = express();

app.use(json());

app.use('/api/github', githubRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});