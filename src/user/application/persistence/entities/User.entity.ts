import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import DomainUser from '../../../domain/User';
import UserId from '../../../domain/UserId';
import EmailAddress from '../../../../contexts/domain/EmailAddress';

type Params = {
  id: string;
  name: string;
  email: string;
};

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password!: string;

  constructor(init: Params) {
    super();

    const { id, name, email } = init || ({} as Params);
    this.id = id;
    this.name = name;
    this.email = email;
  }

  hydrate(): DomainUser {
    return new DomainUser({
      userId: new UserId(this.id),
      name: this.name,
      email: new EmailAddress(this.email),
    });
  }

  static dehydrate(user: DomainUser): User {
    return new User({
      id: user.userId.toString(),
      name: user.name,
      email: user.email.toString(),
    });
  }
}
