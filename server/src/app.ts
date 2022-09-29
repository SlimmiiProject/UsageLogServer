import express from "express";
import { Express } from "express-serve-static-core";
import { Logger } from "./utils/logger";

export class App {

    public static readonly INSTANCE = new App();
    private app: Express;

    constructor() {
        this.app = express();
        this.setup();
    }

    private setup() {
        this.app.set("port", process.env.PORT);
    }

    public start(): void {
        this.getApp().listen(this.getPort(), () => Logger.info(`App has started on port: ${this.getPort()}`));
    }

    public getApp(): Express {
        return this.app;
    }

    private getPort() {
        return this.app.get("port");
    }
}

App.INSTANCE.start();