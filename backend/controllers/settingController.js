import { asyncHandler } from '../middleware/asyncHandler.js';
import { settingRepository } from '../repositories/settingRepository.js';
import ApiError from '../utils/ApiError.js';

const SETTINGS_KEY = 'company';

const readStored = async () => {
  const record = await settingRepository.get(SETTINGS_KEY);
  const value = record && typeof record.value === 'object' && record.value !== null ? record.value : {};
  return { profile: value.profile ?? {}, serviceRates: Array.isArray(value.serviceRates) ? value.serviceRates : [] };
};

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await readStored();
  res.json({ success: true, settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { profile, serviceRates } = req.body ?? {};

  if (profile !== undefined && (typeof profile !== 'object' || profile === null || Array.isArray(profile))) {
    throw ApiError.badRequest('profile must be an object');
  }
  if (serviceRates !== undefined && !Array.isArray(serviceRates)) {
    throw ApiError.badRequest('serviceRates must be an array');
  }

  const current = await readStored();
  const next = {
    profile: profile !== undefined ? profile : current.profile,
    serviceRates: serviceRates !== undefined ? serviceRates : current.serviceRates,
  };

  await settingRepository.set(SETTINGS_KEY, next);
  res.json({ success: true, message: 'Settings updated', settings: next });
});

export default { getSettings, updateSettings };
