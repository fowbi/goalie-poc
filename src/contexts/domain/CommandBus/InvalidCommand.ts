import Command from './Command';

export default class InvalidCommand extends Error {
  static becauseCommandIsNotRegistered(command: Command): InvalidCommand {
    return new InvalidCommand(`Command ${command.constructor} is not registered.`);
  }
}
