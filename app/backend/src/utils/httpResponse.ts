import { Response } from 'express';

const httpResponse = (res: Response, statusCode?: number, message?: string): Response =>
  res.status(statusCode || 500).json({
    message: message || 'Internal Error',
  });

export default httpResponse;
