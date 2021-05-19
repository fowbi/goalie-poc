import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: __dirname + '/data/db.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  //logging: true,
  synchronize: true,
};

export default config;
