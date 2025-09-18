import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { sessionsQwRepository } from '../../qw-repository/sessions-qw-repository';

export async function getActiveSessionsHandler(req: Request, res: Response) {
  try {
    const activeSessions = await sessionsQwRepository.findMany(req.user!.id);

    res.status(HttpStatus.Ok).send(activeSessions);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
