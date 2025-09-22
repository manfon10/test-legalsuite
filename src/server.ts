import express, { Router } from "express";
import morgan from "morgan";

import { envs, ErrorHandler, logger } from "./infraestructure";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private port: number;
  private routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(morgan(envs.NODE_ENV !== "production" ? "dev" : "combined"));

    this.app.use("/api/v1", this.routes);

    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: `Route ${req.method} ${req.url} not found`,
      });
    });
  }

  logErrors() {
    this.app.use(ErrorHandler.handle);
  }

  start() {
    this.middlewares();

    this.logErrors();

    this.listen();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info(`Servidor corriendo en el puerto: ${this.port}`, {
        context: { operation: "server_startup" },
        details: { port: this.port, env: envs.NODE_ENV },
      });
    });
  }
}
