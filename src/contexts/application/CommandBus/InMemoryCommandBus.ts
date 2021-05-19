import 'reflect-metadata';
import { injectable, multiInject } from 'inversify';

import TYPES from '../../constants/types';
import { Command, CommandBus, CommandHandler, InvalidCommand } from '../../domain/CommandBus';

@injectable()
export default class InMemoryCommandBus implements CommandBus {
  private handlers: Map<Command, CommandHandler<Command>>;

  constructor(@multiInject(TYPES.CommandHandler) handlers: CommandHandler<Command>[]) {
    this.handlers = new Map();
    handlers.forEach(commandHandler => {
      this.handlers.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  async dispatch(command: Command): Promise<void> {
    const commandHandler = this.handlers.get(command.constructor);

    if (!commandHandler) {
      throw InvalidCommand.becauseCommandIsNotRegistered(command);
    }

    await commandHandler.handle(command);
  }
}
