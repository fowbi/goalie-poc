import * as dotenv from 'dotenv';

import Server from './server';

(async  () => {
  dotenv.config({ path: __dirname + '/../.env' });

  const server = new Server(process.env.PORT || '8090');
  server.run();
})();
