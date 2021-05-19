const TYPES = {
  CommandBus: Symbol.for('CommandBus'),
  CommandHandler: Symbol.for('CommandHandler'),
  QueryBus: Symbol.for('QueryBus'),
  QueryHandler: Symbol.for('QueryHandler'),
};

export default TYPES;
