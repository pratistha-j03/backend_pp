import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Banner } from './models/bannerModel.js';
import { Service } from './models/serviceModel.js';
import { uploadBanner, uploadService, connectDB } from './configs/config.js';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();
const port= process.env.PORT || 4200;
app.use(express.json());
connectDB();

app.use(cors());
app.use('/admin', adminRoutes);
app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Backend working");
});

export default app;
