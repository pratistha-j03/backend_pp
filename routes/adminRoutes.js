import express from 'express';
import {getBanners, getServices, createBanner, createService, updateService, deleteService} from '../controllers/adminController.js';
import { uploadBanner, uploadService } from '../configs/config.js';
const router = express.Router();

router.get('/banner', getBanners);
router.post('/banner/upload', uploadBanner.single('bannerImage'), createBanner);
router.get('/service', getServices);
router.post('/service', uploadService.single('iconFile'), createService);
router.put('/service/:id', uploadService.single('iconFile'), updateService);
router.delete('/service/:id', deleteService);

export default router;