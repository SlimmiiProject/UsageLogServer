import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { Administrator } from "./entities/Administrator";
import { ContactForm } from "./entities/contact";
import { Data } from "./entities/Data";
import { Device } from "./entities/Device";
import { Password_Reset } from "./entities/Password_reset";
import { TemporaryData } from "./entities/TemporaryData";
import { Translations } from "./entities/Translations";
import { UserAccount } from "./entities/UserAccount";

const {
  database: { database_name, host, port, username, password }
} = Environment.CONFIG;

export class DatabaseConnector {
  private _dataSource: DataSource;
  public get dataSource() {
    return this._dataSource;
  }

  private constructor() {
    this._dataSource = new DataSource({
      type: "mysql",
      host: host,
      port: port,
      username: username,
      password: password,
      database: database_name,
      synchronize: true,
      logging: Environment.isDebug(),
      entities: [
        UserAccount,
        Device,
        Data,
        Administrator,
        Translations,
        TemporaryData,
        ContactForm,
        Password_Reset,
      ],
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
