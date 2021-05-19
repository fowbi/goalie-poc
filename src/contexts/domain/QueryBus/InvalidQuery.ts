import Query from './Query';

export default class InvalidQuery extends Error {
  static becauseQueryIsNotRegistered(query: Query): InvalidQuery {
    return new InvalidQuery(`Query ${query.constructor} is not registered.`);
  }
}
