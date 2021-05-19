import User from './User';

export default interface UserRepository {
  register(user: User, password: string): Promise<void>;

  updatePassword(user: User, password: string): Promise<void>;

  checkSignIn(emailAddress: string, password: string): Promise<boolean>;
}
