import UserId from './UserId';

import EmailAddress from '../../contexts/domain/EmailAddress';

type Params = {
  userId: UserId;
  name: string;
  email: EmailAddress;
};

export default class User {
  userId: UserId;
  name: string;
  email: EmailAddress;

  constructor({ userId, name, email }: Params) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  static create(email: EmailAddress, name: string): User {
    return new User({ userId: UserId.generate(), email, name });
  }
}
