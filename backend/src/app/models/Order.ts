import Sequelize, { Model } from 'sequelize';

import IOrder from '../interfaces/Order';

class Order extends Model<IOrder> {
  public id!: number;
  public recipient_id: number;
  public deliveryman_id: number;
  public signature_id: number;
  public product!: string;
  public canceled_at: Date;
  public start_date: Date;
  public end_date: Date;
  public created_at!: Date;
  public updated_at!: Date;

  public static init(sequelize): typeof Order {
    super.init.call(
      this,
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models): void {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliverer, {
      foreignKey: 'deliveryman_id',
      as: 'deliverer',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Order;
