import express from 'express';
import { dataController } from '../controllers/dataController.js';

const router = express.Router();

// Single route for all methods
router.route('/data').all(dataController);

export default router;
