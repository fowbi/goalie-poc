import { inject, injectable } from 'inversify';

import TYPES from '../../constants/types';
import User from '../../domain/User';
import { encrypt } from '../../domain/Password';
import UserRepository from '../../domain/UserRepository';

import EmailAddress from '../../../contexts/domain/EmailAddress';

@injectable()
export default class RegisterUser {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(email: EmailAddress, password: string, name: string): Promise<void> {
    const user = User.create(email, name);

    await this.userRepository.register(user, encrypt(password));
  }
}
