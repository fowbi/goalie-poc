import { inject, injectable } from 'inversify';

import TYPES from '../../constants/types';
import RegisterUser from './RegisterUser';
import RegisterUserCommand from './RegisterUserCommand';
import { Command, CommandHandler } from '../../../contexts/domain/CommandBus';

@injectable()
export default class RegisterUserCommandHandler implements CommandHandler<RegisterUserCommand> {
  private registerUser: RegisterUser;

  constructor(@inject(TYPES.RegisterUser) registerUser: RegisterUser) {
    this.registerUser = registerUser;
  }

  subscribedTo(): Command {
    return RegisterUserCommand;
  }

  async handle(command: RegisterUserCommand): Promise<void> {
    this.registerUser.run(command.email, command.password, command.name);
    // send out event
  }
}
