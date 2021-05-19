import 'reflect-metadata';
import { AsyncContainerModule } from 'inversify';

import CONTEXT_TYPES from '../contexts/constants/types';
import { Command, CommandHandler } from '../contexts/domain/CommandBus';
import { Query, QueryHandler } from '../contexts/domain/QueryBus';

import TYPES from './constants/types';
import RegisterUserControllerAction from './application/http/RegisterUserControllerAction';
import AuthenticateControllerAction from './application/http/AuthenticateControllerAction';
import UserRepository from './domain/UserRepository';
import SqliteUserRepository from './application/persistence/SqliteUserRepository';
import RegisterUserCommandHandler from './application/contexts/RegisterUserCommandHandler';
import RegisterUser from './application/contexts/RegisterUser';
import CanSignInQueryHandler from './application/contexts/CanSignInQueryHandler';
import SignIn from './application/contexts/SignIn';

export const bindings = new AsyncContainerModule(async bind => {
  bind<AuthenticateControllerAction>(TYPES.AuthenticateControllerAction).to(AuthenticateControllerAction);
  bind<RegisterUserControllerAction>(TYPES.RegisterUserControllerAction).to(RegisterUserControllerAction);
  bind<UserRepository>(TYPES.UserRepository).to(SqliteUserRepository);

  bind<CommandHandler<Command>>(CONTEXT_TYPES.CommandHandler).to(RegisterUserCommandHandler);
  bind<RegisterUser>(TYPES.RegisterUser).to(RegisterUser);

  bind<QueryHandler<Query, Response>>(CONTEXT_TYPES.QueryHandler).to(CanSignInQueryHandler);
  bind<SignIn>(TYPES.SignIn).to(SignIn);
});
