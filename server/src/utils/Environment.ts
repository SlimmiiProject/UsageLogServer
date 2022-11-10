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

    public static isDebug(): boolean {
        return this.CONFIG.debug;
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
        const config = { ...dotenv.config()["parsed"], ...argv_conf }

        return {
            url: process.env.URL,
            server_port: parseInt(process.env.SERVER_PORT),
            developmentEnv: Converter.parseBoolean(process.env.DEV_ENV),
            session_secret: process.env.SESSION_SECRET,
            debug: Converter.parseBoolean(process.env.DEBUG_MODE),

            database: {
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database_name: process.env.DATABASE_NAME
            },

            mailer: {
                smtp_host: process.env.MAIL_HOST,
                smtp_port: parseInt(process.env.MAIL_PORT),
                username: process.env.MAIL_USERNAME,
                password: process.env.MAIL_PASSWORD
            }
        }
    }
}