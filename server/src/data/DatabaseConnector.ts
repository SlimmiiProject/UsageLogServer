import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { Device } from "./entities/Device";
import { Translations } from "./entities/Translations";
import { UserAccount } from "./entities/UserAccount";

const { database } = Environment.CONFIG;

export class DatabaseConnector {
  private _dataSource: DataSource;
  public get dataSource() {
    return this._dataSource;
  }

  private constructor() {
    this._dataSource = new DataSource({
      type: "mysql",
      ...database,
      synchronize: true,
      logging: Environment.isDev(),
      entities: [UserAccount, Device, Data, Administrator, Translations],
    });
  }

  private static _INSTANCE: DatabaseConnector;

  public static get INSTANCE(): DatabaseConnector {
    if (!this._INSTANCE) this._INSTANCE = new DatabaseConnector();
    return this._INSTANCE;
  }

  public async initialize() {
    if (this.dataSource.isInitialized) {
      Logger.warn("Database can't be initialized more than one time!");
      return;
    }

    try {
      this._dataSource = await this.dataSource.initialize();
      Logger.info("Connected to database.");
    } catch (error) {
      Logger.error(error);
      throw new Error("Something went wrong when connecting to the database");
    }
  }
}
