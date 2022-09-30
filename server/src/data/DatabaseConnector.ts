import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { Device } from "./entities/Device";
import { UserAcount } from "./entities/User";

const { database } = Environment.CONFIG;

export class DatabaseConnector {
  private _dataSource: DataSource;

  private constructor() {
    this._dataSource = new DataSource({
      type: "mysql",
      ...database,
      synchronize: true,
      logging: Environment.isDev(),
      entities: [UserAcount, Device, Data, Administrator],
    });
  }

  private static _INSTANCE: DatabaseConnector;

  public static get INSTANCE(): DatabaseConnector {
    if (!this._INSTANCE) this._INSTANCE = new DatabaseConnector();
    return this._INSTANCE;
  }

  public async initialize() {
    if (this._dataSource.isInitialized) {
      Logger.warn("Database can't be initialized more than one time!");
      return;
    }

    try {
      this._dataSource = await this._dataSource.initialize();
      Logger.info("Connected to database.");
    } catch (error) {
      Logger.error(error);
      throw new Error("Something went wrong when connecting to the database");
    }
  }
}
