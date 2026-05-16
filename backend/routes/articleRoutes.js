import express from 'express';
const router = express.Router();
import { getAllArticles, getArticleBySlug } from '../controllers/articleController.js';

router.get('/', getAllArticles);
router.get('/:slug', getArticleBySlug);

// BU SƏTRİ ƏLAVƏ EDİN (və ya köhnəsini bununla əvəz edin):
export default router;