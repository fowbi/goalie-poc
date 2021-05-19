import { Response } from '../../../contexts/domain/QueryBus';
export default class CanSignInResponse implements Response {
  readonly result: boolean;

  constructor(result: boolean) {
    this.result = result;
  }
}
