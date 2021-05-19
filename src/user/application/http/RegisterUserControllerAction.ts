import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import httpStatus from 'http-status';

import RegisterUserCommand from '../contexts/RegisterUserCommand';

import ControllerAction from '../../../contexts/http/ControllerAction';
import { CommandBus } from '../../../contexts/domain/CommandBus';
import EmailAddress from '../../../contexts/domain/EmailAddress';
import CONTEXT_TYPES from '../../../contexts/constants/types';

@injectable()
export default class RegisterUserControllerAction implements ControllerAction {
  private commandBus: CommandBus;

  constructor(@inject(CONTEXT_TYPES.CommandBus) commandBus: CommandBus) {
    this.commandBus = commandBus;
  }

  async run(request: Request, response: Response) {
    // todo
    // - user input validation via middleware
    // - check duplicate email in handler
    const email: string = request.body.email;
    const password: string = request.body.password;
    const name: string = request.body.name;

    const command = new RegisterUserCommand({
      email: new EmailAddress(email),
      password,
      name,
    });

    try {
      await this.commandBus.dispatch(command);
    } catch (error) {
      response.status(httpStatus.BAD_REQUEST).json(error);
    }

    response.status(httpStatus.CREATED).send();
  }
}
