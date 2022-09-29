import { DataSource } from "typeorm";
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";

const databaseConfig = Environment.CONFIG.database;

export class DatabaseConnector {

    public static readonly INSTANCE = new DatabaseConnector();

    private _dataSource: DataSource;

    constructor() {
        this._dataSource = new DataSource({
            type:"mysql",
            ...databaseConfig,
            synchronize: true,
            logging: Environment.isDev(),
            entities: []
        });
    }

    public async initialize() {
        try {
            await this._dataSource.initialize();
            Logger.info("Connected to database.");
        } catch (error) {
            Logger.error(error);
            throw new Error("Something went wrong when connecting to the database");
        }
    }
}