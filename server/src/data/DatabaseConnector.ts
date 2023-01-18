import { Logfile } from './entities/Logfile';
import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { Administrator } from "./entities/Administrator";
import { ContactForm } from "./entities/Contact";
import { Data } from "./entities/Data";
import { Device } from "./entities/Device";
import { PasswordReset } from "./entities/PasswordReset";
import { TemporaryData } from "./entities/TemporaryData";
import { UserAccount } from "./entities/UserAccount";
import { TranslationData } from './entities/TranslationData';

export class DatabaseConnector {

  private static CONNECTORS: Map<string, DatabaseConnector> = new Map();

  private _dataSource: DataSource;
  public get dataSource() {
    return this._dataSource;
  }

  public static createConnector({
    database_name,
    host,
    port,
    username,
    password,
  }: typeof Environment.CONFIG.database) {
    const namePair = `${host}:${port}`;
    if (this.CONNECTORS.has(namePair)) return this.CONNECTORS.get(namePair);

    const connector = new DatabaseConnector(
      host,
      port,
      username,
      password,
      database_name
    );
    this.CONNECTORS.set(namePair, connector);
    return connector;
  }

  public static get entities() {
    return [
      UserAccount,
      Device,
      Data,
      Administrator,
      TemporaryData,
      ContactForm,
      PasswordReset,
      Logfile,
      TranslationData
    ];
  }

  private constructor(
    host: string,
    port: number,
    username: string,
    password: string,
    database_name: string
  ) {
    this._dataSource = new DataSource({
      type: "mysql",
      host: host,
      port: port,
      username: username,
      password: password,
      database: database_name,
      synchronize: true,
      logging: Environment.isDebug(),
      entities: DatabaseConnector.entities,
      connectTimeout: 20000,
      acquireTimeout: 20000,
    });
  }

  private static _INSTANCE: DatabaseConnector;

  public static get INSTANCE(): DatabaseConnector {
    if (!this._INSTANCE)
      this._INSTANCE = this.createConnector(Environment.CONFIG.database);
    return this._INSTANCE;
  }

  public  initialize = async () => {
    if (this._dataSource.isInitialized)
      return Logger.warn("Database can't be initialized more than one time!");

    try {
      this._dataSource = await this._dataSource.initialize();
      await this.dataSource.synchronize(false);
      Logger.info("Connected to database.");
    } catch (error: any) {
      console.log( Object.entries(await this._dataSource))
      Logger.error([error, error.stack]);
      throw new Error("Something went wrong when connecting to the database");
    }
  }

  public async disconnect() {
    if (!this._dataSource.isInitialized) return;
    this._dataSource.destroy();
  }
}
