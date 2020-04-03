import Sequelize, { Model } from 'sequelize';

import IDeliverer from '../interfaces/Deliverer';

class Deliverer extends Model<IDeliverer> {
  public id!: number;
  public name!: string;
  public avatar_id: number;
  public email!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public static init(sequelize): typeof Deliverer {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models): void {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliverer;
