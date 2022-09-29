import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";

const databaseConfig = Environment.CONFIG.database;

export class DatabaseConnector {

    private _dataSource: DataSource = new DataSource({
        type: "mysql",
        ...databaseConfig,
        synchronize: true,
        logging: Environment.isDev(),
        entities: []
    });;

    private constructor() {
      
    }

    private static _INSTANCE:DatabaseConnector;

    public static get INSTANCE(): DatabaseConnector {
        if (!this._INSTANCE) this._INSTANCE = new DatabaseConnector();
        return this._INSTANCE;
    }

    public async initialize() {
        if(this._dataSource.isInitialized) {
            Logger.warn("Database can't be initialized more than one time!")
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