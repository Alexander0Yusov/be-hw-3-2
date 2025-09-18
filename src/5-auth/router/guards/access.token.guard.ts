import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../../adapters/jwt.service';
import { IdType } from '../../../core/types/id';

export const accessTokenGuard = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.headers.authorization - ', req.headers.authorization);

  if (!req.headers.authorization) return res.sendStatus(401);

  const [authType, token] = req.headers.authorization.split(' ');

  console.log('token - ', token);

  if (authType !== 'Bearer') return res.sendStatus(401);

  const payload = await jwtService.verifyAccessToken(token);

  console.log('payload - ', payload);

  if (payload) {
    const { userId } = payload;

    req.user = { id: userId } as IdType;
    next();

    return;
  }
  res.sendStatus(401);

  return;
};
