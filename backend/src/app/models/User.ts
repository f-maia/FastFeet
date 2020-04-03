import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import IUser from '../interfaces/User';

class User extends Model<IUser> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static init(sequelize): typeof User {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook(
      'beforeSave',
      async (user: User): Promise<void> => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      }
    );

    return this;
  }

  checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
