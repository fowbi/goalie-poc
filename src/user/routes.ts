import { Express } from 'express';
import { Container } from 'inversify';

import TYPES from './constants/types';
import RegisterUserControllerAction from './application/http/RegisterUserControllerAction';
import verifyUserRegisterRequest from './application/http/middleware/VerifyUserRegisterRequest';
import AuthenticateControllerAction from './application/http/AuthenticateControllerAction';
import verifyAuthenticateRequest from './application/http/middleware/VerifyAuthenticateRequest';

export const register = (app: Express, container: Container) => {
  const registerUserAction = container.get<RegisterUserControllerAction>(TYPES.RegisterUserControllerAction);
  app.post('/register', [verifyUserRegisterRequest], registerUserAction.run.bind(registerUserAction));

  const authenticateAction = container.get<AuthenticateControllerAction>(TYPES.AuthenticateControllerAction);
  app.post('/authenticate', [verifyAuthenticateRequest], authenticateAction.run.bind(authenticateAction));
};
