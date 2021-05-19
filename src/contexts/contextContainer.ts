import 'reflect-metadata';
import { Container } from 'inversify';

import TYPES from './constants/types';
import { CommandBus } from './domain/CommandBus';
import InMemoryCommandBus from './application/CommandBus/InMemoryCommandBus';
import InMemoryQueryBus from './application/QueryBus/InMemoryQueryBus';
import { QueryBus } from './domain/QueryBus';

const container = new Container();

container.bind<CommandBus>(TYPES.CommandBus).to(InMemoryCommandBus);
container.bind<QueryBus>(TYPES.QueryBus).to(InMemoryQueryBus);

export default container;
