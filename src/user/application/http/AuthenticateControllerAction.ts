import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import httpStatus from 'http-status';

import CanSignInQuery from '../contexts/CanSignInQuery';
import CanSignInResponse from '../contexts/CanSignInResponse';

import ControllerAction from '../../../contexts/http/ControllerAction';
import { QueryBus } from '../../../contexts/domain/QueryBus';
import EmailAddress from '../../../contexts/domain/EmailAddress';
import CONTEXT_TYPES from '../../../contexts/constants/types';

@injectable()
export default class AuthenticateControllerAction implements ControllerAction {
  private queryBus: QueryBus;

  constructor(@inject(CONTEXT_TYPES.QueryBus) queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  async run(request: Request, response: Response) {
    // todo user input validation via middleware
    const email: string = request.body.email;
    const password: string = request.body.password;

    const query = new CanSignInQuery(new EmailAddress(email), password);

    let statusCode = httpStatus.OK;
    try {
      const authenticatedResponse: CanSignInResponse = await this.queryBus.ask(query);
      statusCode = authenticatedResponse.result ? httpStatus.OK : httpStatus.UNAUTHORIZED;
    } catch (error) {
      console.log(error);
      response.status(httpStatus.BAD_REQUEST).json(error);
    }

    response.status(statusCode).send();
  }
}
