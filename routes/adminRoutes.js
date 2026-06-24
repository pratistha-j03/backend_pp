import express from 'express';
import {getBanners, getServices, createBanner, createService, updateService, deleteService} from '../controllers/adminController.js';
import { uploadBanner, uploadService } from '../configs/config.js';
const router = express.Router();

router.get('/banner', getBanners);
router.post('/banner/upload', uploadBanner.single('bannerImage'), createBanner);
router.get('/service', getServices);
router.post('/service', uploadService.fields([
  { name: 'iconFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]), createService);
router.put('/service/:id', uploadService.fields([
  { name: 'iconFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]), updateService);
router.delete('/service/:id', deleteService);

export default router;