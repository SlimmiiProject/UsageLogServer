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
     * It reads the .env file and command line arguments and returns an object with the combination of values from the .env file and command line arguments with a prioritization for CLI.
     * 
     * @returns An object with our .env properties:
     */
    private static setupConfig() {
        const argv_set = process.argv.slice(2, process.argv.length).map((value, index) => index % 2 ? value : value.toUpperCase())
                                                                   .join(" ").split(/(?!^)(?=\-\-)/);
        const argv_conf = process.argv.length == 2 ? {} : Object.fromEntries(argv_set.map(set_string => set_string.split(" ").map((value, index) => index % 2 ? value : value.replace("--", ""))))
        const config = {... dotenv.config()["parsed"], ... argv_conf}

        return {
            url: config.URL,
            port: parseInt(config.PORT!),
            developmentEnv: Converter.parseBoolean(config.DEV_ENV),

            database: {
                host: config.DATABASE_HOST,
                port: parseInt(config.DATABASE_PORT!),
                username: config.DATABASE_USERNAME,
                password: config.DATABASE_PASSWORD,
                database: config.DATABASE_NAME
            }
        }
    }
}
