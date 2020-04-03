import { Sequelize, Options } from 'sequelize';
import mongoose from 'mongoose';

import * as databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliverer from '../app/models/Deliverer';
import Order from '../app/models/Order';

const models = [User, Recipient, File, Deliverer, Order];
export const IModels = typeof models;

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
    this.mongo();
  }

  private init(): void {
    this.connection = new Sequelize(databaseConfig as Options);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  private mongo(): void {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
