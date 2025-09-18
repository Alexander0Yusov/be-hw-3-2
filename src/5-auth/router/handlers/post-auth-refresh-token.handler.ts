import { Response } from 'express';
import { IdType } from '../../../core/types/id';
import { RequestWithUserId } from '../../../core/types/requests';
import { authService } from '../../domain/auth.service';
import { ResultStatus } from '../../../core/result/resultCode';
import { resultCodeToHttpException } from '../../../core/result/resultCodeToHttpException';
import { sessionsService } from '../../../7-security/application/sessions.service';

export async function postAuthRefreshTokenHandler(req: RequestWithUserId<IdType>, res: Response) {
  const incomeRefreshToken = req.cookies.refreshToken;

  const result = await authService.updateTokensPair(incomeRefreshToken);

  if (result.status !== ResultStatus.Success) {
    return res.status(resultCodeToHttpException(result.status)).send(result.extensions);
  }

  // обновление сессии. поиск по девайсу и дате выдачи. обновление дат
  await sessionsService.update(incomeRefreshToken, result.data!.refreshToken);

  res.cookie('refreshToken', result!.data!.refreshToken, { httpOnly: true, secure: true });

  res.status(resultCodeToHttpException(result.status)).send({ accessToken: result.data!.accessToken });
}
