import dotenv from "dotenv";
import { Converter } from "./Converter";

export class Environment {

    public static readonly CONFIG = this.setupConfig();

    public static isDev(): boolean {
        return this.CONFIG.developmentEnv;
    }

    private static setupConfig() {
        dotenv.config();

        return {
            url: process.env.URL,
            port: parseInt(process.env.PORT!),
            developmentEnv: Converter.parseBoolean(process.env.DEV_ENV),

            database: {
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT!),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            }
        }
    }
}
