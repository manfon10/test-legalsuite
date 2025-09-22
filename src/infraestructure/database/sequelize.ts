import path from "path";
import fs from "fs";

import { Model, ModelStatic, Sequelize } from "sequelize";

import { envs, logger } from "../config";
import { InternalServerError } from "../../domain/errors";

interface Options {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

export interface SequelizeModel extends ModelStatic<Model> {
  associate?: (models: { [key: string]: SequelizeModel }) => void;
  initModel?: (sequelize: Sequelize) => void;
}

export class SequelizeDatabase {
  private static sequelize: Sequelize;

  static async connect(options: Options) {
    const { database, password, username, host, port } = options;

    try {
      this.sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect: "postgres",
        define: {
          underscored: true,
          timestamps: true,
        },
        logging: false,
      });

      this.initModels();

      if (envs.NODE_ENV !== "production") {
        await this.sequelize.sync();
      }

      logger.info("Conexión a la base de datos establecida correctamente.", {
        context: { operation: "database_connection" },
        details: { host, port, dialect: "postgres" },
      });
    } catch (error) {
      logger.error((error as Error).message, {
        context: { operation: "database_connection" },
        details: {
          host,
          port,
          dialect: "postgres",
        },
      });
    }
  }

  private static initModels() {
    const modelsPath = path.resolve(__dirname, "models");

    fs.readdirSync(modelsPath).forEach((file) => {
      if (file.endsWith(".ts") || (file.endsWith(".js") && !file.startsWith("index"))) {
        const model: SequelizeModel = require(path.join(modelsPath, file)).default;

        if (typeof model.initModel === "function") {
          model.initModel(this.sequelize);
        }

        if (!this.sequelize.models[model.name]) {
          this.sequelize.models[model.name] = model;
        }
      }
    });

    Object.keys(this.sequelize.models).forEach((modelName) => {
      const model = this.sequelize.models[modelName] as SequelizeModel;

      if (model.associate) {
        model.associate(this.sequelize.models);
      }
    });
  }

  static getSequelizeInstance(): Sequelize {
    if (!this.sequelize) {
      throw new InternalServerError(
        "No se pudo inicializar la conexión con la base de datos. Asegúrate de llamar a SequelizeDatabase.connect() antes de usarla.",
        {
          context: { operation: "database_connection" },
          details: {
            host: envs.DB_HOST,
            dialect: "postgres",
            field: "sequelize_instance",
            constraint: "not_initialized",
          },
        }
      );
    }

    return this.sequelize;
  }
}
