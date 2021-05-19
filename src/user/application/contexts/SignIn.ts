import { inject, injectable } from 'inversify';

import TYPES from '../../constants/types';
import CanSignInResponse from './CanSignInResponse';
import EmailAddress from '../../../contexts/domain/EmailAddress';
import UserRepository from '../../domain/UserRepository';

@injectable()
export default class SignIn {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(emailAddress: EmailAddress, password: string): Promise<CanSignInResponse> {
    const result = await this.userRepository.checkSignIn(emailAddress.toString(), password);
    return new CanSignInResponse(result);
  }
}
