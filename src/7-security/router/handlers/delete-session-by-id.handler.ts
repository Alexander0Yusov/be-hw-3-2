import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { sessionsService } from '../../application/sessions.service';
import { authService } from '../../../5-auth/domain/auth.service';

export async function deleteSessionByIdHandler(req: Request, res: Response) {
  try {
    const session = await sessionsService.findById(req.params.deviceId);

    if (!session) {
      res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'deviceId', message: 'Device not found' }]));
      return;
    }

    if (req.user!.id !== session.userId) {
      res.status(HttpStatus.Forbidden).send(createErrorMessages([{ field: 'user', message: 'Forbidden' }]));
      return;
    }

    await sessionsService.deleteOne(session.deviceId, session.userId);

    await authService.logoutDeviceById(session.deviceId);

    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
