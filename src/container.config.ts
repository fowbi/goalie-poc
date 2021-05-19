import 'reflect-metadata';
import { AsyncContainerModule } from 'inversify';

import getDbConnection from './server/database';
import { bindings } from './user/userContainer';
import contextContainer from './contexts/contextContainer';

const getContainer = async () => {
  const databaseBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
  });
  await contextContainer.loadAsync(databaseBinding, bindings);

  return contextContainer;
};

export default getContainer;
