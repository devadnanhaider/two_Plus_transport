import { asyncHandler } from '../middleware/asyncHandler.js';
import { vehicleRepository } from '../repositories/vehicleRepository.js';
import ApiError from '../utils/ApiError.js';

export const listVehicles = asyncHandler(async (req, res) => {
  const vehicles = await vehicleRepository.findAll();
  res.json({ success: true, count: vehicles.length, vehicles });
});

export const createVehicle = asyncHandler(async (req, res) => {
  const { name, category, capacity, plate, driver, ratePerHour, status, image } = req.body;

  const vehicle = await vehicleRepository.create({
    name,
    category: category ?? undefined,
    capacity: capacity ?? '',
    plate: plate ?? '',
    driver: driver ?? '',
    ratePerHour: ratePerHour ?? 0,
    status: status ?? 'Available',
    image: image ?? '',
  });

  res.status(201).json({ success: true, vehicle });
});

export const updateVehicle = asyncHandler(async (req, res) => {
  const allowed = {};
  ['name', 'category', 'capacity', 'plate', 'driver', 'ratePerHour', 'status', 'image'].forEach(key => {
    if (req.body[key] !== undefined) allowed[key] = req.body[key];
  });

  const vehicle = await vehicleRepository.updateById(req.params.id, allowed);
  if (!vehicle) throw ApiError.notFound('Vehicle not found');

  res.json({ success: true, vehicle });
});

export const deleteVehicle = asyncHandler(async (req, res) => {
  const removed = await vehicleRepository.deleteById(req.params.id);
  if (!removed) throw ApiError.notFound('Vehicle not found');

  res.json({ success: true, message: 'Vehicle removed' });
});

export default { listVehicles, createVehicle, updateVehicle, deleteVehicle };
