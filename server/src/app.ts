import express from "express";
import { Express } from "express-serve-static-core";
import { Logger } from "./utils/Logger";
import "reflect-metadata";
import { DatabaseConnector } from "./data/DatabaseConnector";
import { Environment } from "./utils/Environment";
import helmet from "helmet";


const cors = require("cors");
const {port, url} = Environment.CONFIG;

export class App {

    public static readonly INSTANCE = new App();
    
    private _app: Express;

    public get App(): Express {
        return this._app;
    }

    private constructor() {
        this._app = express();
        this.setup();
        this.appSetup();
    }

    private async setup() {
        await DatabaseConnector.INSTANCE.initialize();
    }

    private appSetup() {
        this.App.set("port", port);
        this.App.use(helmet());
        this.App.use(cors());
    }

    public start() {
        this.App.listen(this.port, () => Logger.info(`App has started on: ${url}:${this.port}/`));
    }


    private get port() {
        return this._app.get("port");
    }
}

App.INSTANCE.start();