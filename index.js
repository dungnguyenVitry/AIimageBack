import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import aimageRoutes from './routes/aimageRoutes.js';



dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5173',
}));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', aimageRoutes);


app.get('/', async (req, res) => {
    res.send('Hello from AImage');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
        console.log(error);
    }
}




startServer();