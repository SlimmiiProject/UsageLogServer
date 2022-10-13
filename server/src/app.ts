import express, { Router } from "express";
import { Express } from "express-serve-static-core";
import "reflect-metadata";
import { DatabaseConnector } from "./data/DatabaseConnector";
import { Environment } from "./utils/Environment";
import helmet from "helmet";
import { Logger } from "./utils/Logger";

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
        this.setupRoutes();
    }

    private async setup() {
        await DatabaseConnector.INSTANCE.initialize();
    }

    private appSetup() {
        this.App.set("port", port);
        this.App.use(helmet());
        this.App.use(cors());
    }

    private setupRoutes() {
        const apiRouter:Router = require("./routes/ApiRouter");
        const translationRouter:Router = require("./routes/TranslationRoutes");
        const userRouter:Router = require("./routes/UserRouter");
        const dataRouter:Router = require("./routes/DataRouter");
        const profileRouter:Router = require("./routes/ProfileRouter");

        this.App.use("/api", apiRouter);
        apiRouter.use("/translation", translationRouter);
        apiRouter.use("/users/:userId", userRouter);
        apiRouter.use("/data", dataRouter);
        apiRouter.use("/profiles", profileRouter);
    }

    public start() {
        this.App.listen(this.port, () => Logger.info(`App has started on: ${url}:${this.port}/`));
    }

    private get port() {
        return this._app.get("port");
    }
}

App.INSTANCE.start();