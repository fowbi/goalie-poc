import * as EmailValidator from 'email-validator';

export class InvalidEmailError extends Error {}

export default class EmailAddress {
  value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    if (!EmailValidator.validate(value)) {
      throw new InvalidEmailError(`<${value}> is not a valid email`);
    }
  }

  toString(): string {
    return this.value;
  }
}
