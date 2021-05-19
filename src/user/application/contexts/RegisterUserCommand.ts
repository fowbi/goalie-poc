import { Command } from '../../../contexts/domain/CommandBus';
import EmailAddress from '../../../contexts/domain/EmailAddress';

type RegisterUserCommandType = {
  email: EmailAddress;
  password: string;
  name: string;
};

export default class RegisterUserCommand extends Command {
  email: EmailAddress;
  password: string;
  name: string;

  constructor({ email, password, name }: RegisterUserCommandType) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
