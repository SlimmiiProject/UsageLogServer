import dotenv from "dotenv";
import { Converter } from "./Converter";

export class Environment {

    public static get CONFIG() { return this.setupConfig(); }

    /**
     * @returns If we're currently working in a dev environment
     */
    public static isDev(): boolean {
        return this.CONFIG.developmentEnv;
    }

    /**
     * It reads the .env file and returns an object with the values from the .env file.
     * @returns An object with our .env properties:
     */
    private static setupConfig() {
        dotenv.config();

        return {
            url: process.env.URL,
            server_port: parseInt(process.env.SERVER_PORT),
            developmentEnv: Converter.parseBoolean(process.env.DEV_ENV),

            database: {
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            }
        }
    }
}