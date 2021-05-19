import  { v4 } from 'uuid';
import validate from 'uuid-validate';

export class InvalidUuidError extends Error {}

export default class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.validateUuid(value);
    this.value = value;
  }

  static generate(): Uuid {
    return new Uuid(v4());
  }

  private validateUuid(value: string): void {
    if (!validate(value)) {
      throw new InvalidUuidError(`<${value}> is not a valid <${this.constructor.name}>`);
    }
  }

  toString(): string {
    return this.value;
  }
}
