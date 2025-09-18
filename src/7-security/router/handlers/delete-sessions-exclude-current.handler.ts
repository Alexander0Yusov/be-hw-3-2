import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { sessionsService } from '../../application/sessions.service';

export async function deleteSessionsExcludeCurrentHandler(req: Request, res: Response) {
  try {
    const deviceId = req.device!.id;
    const userId = req.user!.id;

    if (await sessionsService.deleteAllExceptCurrent(userId, deviceId)) {
      res.sendStatus(HttpStatus.NoContent);
      return;
    }

    res.sendStatus(HttpStatus.Forbidden);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
