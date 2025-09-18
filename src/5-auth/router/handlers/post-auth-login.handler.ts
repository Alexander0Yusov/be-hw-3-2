import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { AuthInputModel } from '../../types/auth-iput-model';
import { authService } from '../../domain/auth.service';
import { ResultStatus } from '../../../core/result/resultCode';
import { resultCodeToHttpException } from '../../../core/result/resultCodeToHttpException';
import { sessionsService } from '../../../7-security/application/sessions.service';

export async function postAuthLoginHandler(req: Request<{}, {}, AuthInputModel>, res: Response) {
  const ip = req.ip; // || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const device_name = req.get('user-agent') || 'Unknown device';

  const { loginOrEmail, password } = req.body;

  const result = await authService.loginUser(loginOrEmail, password);

  if (result.status !== ResultStatus.Success) {
    return res.status(resultCodeToHttpException(result.status)).send(result.extensions);
  }

  await sessionsService.createSession(result.data!.refreshToken, ip!, device_name);

  res.cookie('refreshToken', result.data!.refreshToken, { httpOnly: true, secure: true });

  return res.status(HttpStatus.Ok).send({ accessToken: result.data!.accessToken });
}
