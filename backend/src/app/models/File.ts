import Sequelize, { Model } from 'sequelize';

import IFile from '../interfaces/File';

class File extends Model<IFile> {
  public id!: number;
  public name!: string;
  public path!: string;
  public url: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static init(sequelize): typeof File {
    super.init.call(
      this,
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get(): string {
            if (this.name === '@fastfeet/seedsUrl') return this.path;

            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
