import { inject, injectable } from 'inversify';

import { Query, QueryHandler } from '../../../contexts/domain/QueryBus';

import TYPES from '../../constants/types';
import CanSignInQuery from './CanSignInQuery';
import CanSignInResponse from './CanSignInResponse';
import SignIn from './SignIn';

@injectable()
export default class CanSignInQueryHandler implements QueryHandler<CanSignInQuery, CanSignInResponse> {
  private signIn: SignIn;

  constructor(@inject(TYPES.SignIn) signIn: SignIn) {
    this.signIn = signIn;
  }

  subscribedTo(): Query {
    return CanSignInQuery;
  }

  async  handle(query: CanSignInQuery): Promise<CanSignInResponse> {
    return this.signIn.run(query.emailAddress, query.password);
  }
}
