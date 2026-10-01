/** Central error handler: normalises every failure into one JSON shape. */
export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const isDuplicate = error.code === 11000;

  if (statusCode >= 500) {
    console.error('[error]', error);
  }

  const message = isDuplicate ? 'An account with these details already exists' : error.message || 'Internal server error';

  res.status(isDuplicate ? 409 : statusCode).json({
    success: false,
    message,
    ...(error.details ? { errors: error.details } : {}),
    ...(process.env.NODE_ENV !== 'production' && statusCode >= 500 ? { stack: error.stack } : {}),
  });
};

export default errorHandler;