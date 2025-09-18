import { Router } from 'express';
import { getActiveSessionsHandler } from './handlers/get-active-sessions.handler';
import { deleteSessionsExcludeCurrentHandler } from './handlers/delete-sessions-exclude-current.handler';
import { deleteSessionByIdHandler } from './handlers/delete-session-by-id.handler';
import { deviceIdValidationMiddleware } from '../validation/id-validation.middleware';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { refreshTokenGuard } from '../../5-auth/router/guards/refresh.token.guard';

export const securityRouter = Router({});

securityRouter.get('/devices', refreshTokenGuard, getActiveSessionsHandler);

securityRouter.delete('/devices', refreshTokenGuard, deleteSessionsExcludeCurrentHandler);

securityRouter.delete(
  '/devices/:deviceId',
  refreshTokenGuard,
  deviceIdValidationMiddleware,
  errorsCatchMiddleware,
  deleteSessionByIdHandler,
);
