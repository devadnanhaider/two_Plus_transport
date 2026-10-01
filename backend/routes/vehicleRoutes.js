import express from 'express';
import { listVehicles, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { vehicleRules, vehiclePatchRules } from '../validators/index.js';

const router = express.Router();

router.get('/', listVehicles);
router.post('/', protect, authorize('admin'), validate(vehicleRules), createVehicle);
router.patch('/:id', protect, authorize('admin'), validate(vehiclePatchRules), updateVehicle);
router.delete('/:id', protect, authorize('admin'), deleteVehicle);

export default router;
