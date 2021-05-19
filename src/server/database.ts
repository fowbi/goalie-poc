import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export default async function getDbConnection() {

  const connection = await createConnection(config);

  return connection;
}
