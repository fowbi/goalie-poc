import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';

import { validate as validatePassword } from '../../domain/Password';
import DomainUser from '../../domain/User';
import User from '../persistence/entities/User.entity';
import UserRepository from '../../domain/UserRepository';

@injectable()
export default class SqliteUserRepository implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async register(user: DomainUser, password: string): Promise<void> {
    const u = User.dehydrate(user);
    u.password = password;

    await this.repository.save(u);
  }

  updatePassword(user: DomainUser, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('update password', user, password);
      resolve();
    });
  }

  async checkSignIn(emailAddress: string, password: string): Promise<boolean> {
    const response = await this.repository
      .createQueryBuilder('user')
      .select('user.password')
      .where('user.email = :email', { email: emailAddress })
      .getRawOne();

    return validatePassword(password, response.user_password);
  }
}
