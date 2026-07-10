import express from 'express';
import {getBanners, getServices, deleteBanner, createBanner, createService, updateService, deleteService, createContactMessage, getContactMessages, markContactMessageRead, deleteContactMessage} from '../controllers/adminController.js';
import { uploadBanner, uploadService } from '../configs/config.js';
const router = express.Router();

router.get('/banner', getBanners);
router.post('/banner/upload', uploadBanner.single('bannerImage'), createBanner);
router.delete('/banner/:id', deleteBanner);
router.get('/service', getServices);
router.post('/service', uploadService.fields([
  { name: 'imageFile', maxCount: 1 }
]), createService);
router.put('/service/:id', uploadService.fields([
  { name: 'imageFile', maxCount: 1 }
]), updateService);
router.delete('/service/:id', deleteService);
router.get('/contact', getContactMessages);
router.put('/contact/:id/read', markContactMessageRead);
router.delete('/contact/:id', deleteContactMessage);

export default router;