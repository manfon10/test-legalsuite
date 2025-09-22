import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  role: string;
  password: string;
  refresh_token: string | null;
}

type UserCreationAttributes = Partial<UserAttributes>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare password: string;
  declare role: string;
  declare refresh_token: string | null;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "operator"),
          allowNull: false,
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      { modelName: "User", paranoid: true, sequelize }
    );
  }
}

export default User;
