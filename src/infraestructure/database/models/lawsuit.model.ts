import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface LawsuitAttributes {
  id: string;
  case_number: string;
  plaintiff: string;
  defendant: string;
  case_type: string;
  status: string;
  lawyer_id: string | null;
}

type LawsuitCreationAttributes = Partial<LawsuitAttributes>;

class Lawsuit extends Model<LawsuitAttributes, LawsuitCreationAttributes> {
  declare id: string;
  declare case_number: string;
  declare plaintiff: string;
  declare defendant: string;
  declare case_type: string;
  declare status: string;
  declare lawyer_id: string | null;

  static associate(models: { [key: string]: SequelizeModel }) {
    Lawsuit.belongsTo(models.Lawyer, { as: "lawyer", foreignKey: "lawyer_id" });
  }

  static initModel(sequelize: Sequelize) {
    Lawsuit.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        case_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        plaintiff: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        defendant: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "assigned", "resolved"),
          allowNull: false,
        },
        case_type: {
          type: DataTypes.ENUM("civil", "criminal", "labor", "commercial"),
          allowNull: false,
        },
        lawyer_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "lawyers",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      { modelName: "Lawsuit", paranoid: true, sequelize }
    );
  }
}

export default Lawsuit;
