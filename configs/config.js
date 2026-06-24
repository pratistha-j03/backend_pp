import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Database connection

export const connectDB = async () => {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error:", err);
    });
    await mongoose.connect(process.env.MONGO_URI);
}

// Cloudinary configuration

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const bannerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'puja_printers/banners',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
  format: 'png',
});

const serviceStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'puja_printers/services',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
  format: 'png',
});

export const uploadBanner = multer({ storage: bannerStorage });
export const uploadService = multer({ storage: serviceStorage });
