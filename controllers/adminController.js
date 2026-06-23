import { Banner } from '../models/bannerModel.js';
import { Service } from '../models/serviceModel.js';
import mongoose from 'mongoose';

const getBanners = async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({ images: ['/src/assets/hero1.png', '/src/assets/hero2.png', '/src/assets/hero3.png'] });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file uploaded' });

    const uploadedImageUrl = req.file.path;

    let banner = await Banner.findOne();
    if (banner) {
      banner.images.push(uploadedImageUrl);
      await banner.save();
    } else {
      banner = await Banner.create({ images: [uploadedImageUrl] });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const iconUrl = req.file? req.file.path:req.body.icon;
    const newService = await Service.create({ title, description, icon: iconUrl });
    res.json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const iconUrl = req.file ? req.file.path : req.body.icon;

    const updated = await Service.findByIdAndUpdate(
      req.params.id, 
      { title, description, icon: iconUrl }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getBanners, createBanner, getServices, createService, updateService, deleteService };
