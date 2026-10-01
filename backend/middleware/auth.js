import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/token.js';
import { userRepository } from '../repositories/userRepository.js';
import ApiError from '../utils/ApiError.js';

const readBearer = req => {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null;
};

/** Requires a valid JWT and attaches the live user document to req.user. */
export const protect = async (req, res, next) => {
  try {
    const token = readBearer(req);
    if (!token) throw new ApiError(401, 'Authentication required: no token provided');

    let payload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      const expired = err.name === 'TokenExpiredError';
      throw new ApiError(401, expired ? 'Session expired, please sign in again' : 'Invalid authentication token');
    }

    const user = await userRepository.findById(payload.sub);
    if (!user) throw new ApiError(401, 'Account no longer exists');

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

/** Restricts a route to the listed roles, e.g. authorize('admin'). */
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  return next();
};

/** Attaches req.user when a valid bearer token exists, but never rejects the request. */
export const optionalAuth = async (req, res, next) => {
  const token = readBearer(req);
  if (token) {
    try {
      const payload = verifyToken(token);
      req.user = await userRepository.findById(payload.sub);
    } catch {
      req.user = null;
    }
  }
  return next();
};

export const verifyOptional = token => {
  try {
    return token ? jwt.verify(token, process.env.JWT_SECRET) : null;
  } catch {
    return null;
  }
};

export default protect;
