import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dataRoutes from './routes/dataRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use('/api', dataRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
