import { Query } from '../../../contexts/domain/QueryBus';
import EmailAddress from '../../../contexts/domain/EmailAddress';

export default class CanSignInQuery implements Query {
  readonly emailAddress: EmailAddress;
  readonly password: string;

  constructor(emailAddress: EmailAddress, password: string) {
    this.emailAddress = emailAddress;
    this.password = password;
  }
}
