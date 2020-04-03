import Sequelize, { Model } from 'sequelize';

import IRecipient from '../interfaces/Recipient';

class Recipient extends Model<IRecipient> {
  public id!: number;
  public name!: string;
  public street!: string;
  public address_details: string;
  public number!: number;
  public state!: string;
  public city!: string;
  public zip_code!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public static init(sequelize): typeof Recipient {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        address_details: Sequelize.STRING,
        number: Sequelize.INTEGER,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Recipient;
