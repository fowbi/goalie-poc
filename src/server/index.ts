import bodyParser from 'body-parser';
import express, { Response, Request } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import httpStatus from 'http-status';
import getContainer from './../container.config';
import registerRoutes from './routes';

export default class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  async run(): Promise<void> {
    const router = Router();
    this.express.use(router);

    getContainer().then(container => {
      registerRoutes(router, container);

      router.use((err: Error, req: Request, res: Response, next: Function) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
      });

      this.listen();
    });
  }

  private async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`\n\tServer is running at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }
}
