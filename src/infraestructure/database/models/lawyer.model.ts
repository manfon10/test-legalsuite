import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface LawyerAttributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: string;
}

type LawyerCreationAttributes = Partial<LawyerAttributes>;

class Lawyer extends Model<LawyerAttributes, LawyerCreationAttributes> {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare status: string;
  declare specialization: string;

  static associate(models: { [key: string]: SequelizeModel }) {
    Lawyer.hasMany(models.Lawsuit, { as: "lawsuits", foreignKey: "lawyer_id" });
  }

  static initModel(sequelize: Sequelize) {
    Lawyer.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("active", "inactive"),
          allowNull: false,
        },
        specialization: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { modelName: "Lawyer", paranoid: true, sequelize }
    );
  }
}

export default Lawyer;
