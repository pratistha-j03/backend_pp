import { Banner } from '../models/bannerModel.js';
import { Service } from '../models/serviceModel.js';
import { Contact } from '../models/contactModel.js';
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

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne();
    if (!banner) return res.status(404).json({ error: 'No banner found' });

    banner.images.splice(Number(id), 1);
    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
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
    const imageUrl = req.files && req.files['imageFile'] ? req.files['imageFile'][0].path : '';
    const newService = await Service.create({ title, description, image: imageUrl });
    res.json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.files && req.files['imageFile']?.[0].path || undefined;

    const updated = await Service.findByIdAndUpdate(
      req.params.id, 
      { title, description, image: imageUrl }, 
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

// const createContactMessage = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body;
 
//     if (!name || !email || !message) {
//       return res.status(400).json({ error: 'Name, email and message are required' });
//     }
 
//     const newMessage = await Contact.create({ name, email, phone, subject, message });
//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const createContactMessage = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        error: "Phone number is required",
      });
    }

    const newMessage = await Contact.create({
      name: name || "",
      phone,
      message: message || "",
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
const markContactMessageRead = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
const deleteContactMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { getBanners, createBanner, deleteBanner, getServices, createService, updateService, deleteService, createContactMessage, getContactMessages, markContactMessageRead, deleteContactMessage };
