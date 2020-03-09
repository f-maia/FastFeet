import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
