import express from "express";
import { Express } from "express-serve-static-core";
import { Logger } from "./utils/Logger";
import "reflect-metadata";
import { DatabaseConnector } from "./data/DatabaseConnector";
import { Environment } from "./utils/Environment";


const cors = require("cors");
const config = Environment.CONFIG;

export class App {

    public static readonly INSTANCE = new App();
    private _app: Express;

    constructor() {
        this._app = express();
        this.appSetup();
        this.setup();
    }

    private async setup() {
        DatabaseConnector.INSTANCE.initialize();
    }

    private appSetup() {
        this._app.set("port", config.port);
        this._app.use(cors());
    }

    public start(): void {
        this.getApp().listen(this.getPort(), () => Logger.info(`App has started on: ${process.env.URL}:${this.getPort()}/`));
    }

    public getApp(): Express {
        return this._app;
    }

    private getPort() {
        return this._app.get("port");
    }
}

App.INSTANCE.start();