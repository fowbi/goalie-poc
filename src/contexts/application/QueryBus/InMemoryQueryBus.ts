import 'reflect-metadata';
import { injectable, multiInject } from 'inversify';

import TYPES from '../../constants/types';
import { Query, QueryBus, QueryHandler, Response, InvalidQuery } from '../../domain/QueryBus';

@injectable()
export default class InMemoryQueryBus implements QueryBus {
  private handlers: Map<Query, QueryHandler<Query, Response>>;

  constructor(@multiInject(TYPES.QueryHandler) handlers: QueryHandler<Query, Response>[]) {
    this.handlers = new Map();
    handlers.forEach(queryHandler => {
      this.handlers.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const queryHandler = this.handlers.get(query.constructor);

    if (!queryHandler) {
      throw InvalidQuery.becauseQueryIsNotRegistered(query);
    }

    return queryHandler.handle(query) as Promise<R>;
  }
}
